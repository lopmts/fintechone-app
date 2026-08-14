import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { loginSchema, registerSchema, verifyCodeSchema } from "../schemas";
import { sendVerificationEmail } from "../services/email.service";
// Gera código numérico de 6 dígitos
function generateCode() {
    return String(Math.floor(100000 + Math.random() * 900000));
}
export async function authRoutes(app) {
    /**
     * POST /auth/register
     *
     * Com password    -> cria conta e retorna JWT imediatamente
     * Sem password    -> cria conta (sem senha) e envia código por e-mail
     *                    o cliente deve chamar POST /auth/verify para obter o JWT
     */
    app.post("/register", {
        schema: {
            body: registerSchema,
        },
    }, async (request, reply) => {
        const result = registerSchema.safeParse(request.body);
        if (!result.success) {
            return reply.status(400).send({ error: result.error.flatten() });
        }
        console.log("Register request:", result.data);
        const { name, email, password } = result.data;
        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) {
            return reply.status(409).send({ error: "E-mail já cadastrado" });
        }
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
        const codeuniq = `USR-${Date.now()}`;
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword, codeuniq },
            select: {
                id: true,
                name: true,
                email: true,
                codeuniq: true,
                createdAt: true,
            },
        });
        // Fluxo com senha -> retorna JWT direto
        if (password) {
            const token = app.jwt.sign({ sub: user.id, email: user.email });
            return reply.status(201).send({ user, token });
        }
        // Fluxo sem senha -> envia código por e-mail
        await issueAndSendCode(user.id, email, name);
        return reply.status(201).send({
            user,
            message: "Conta criada. Verifique seu e-mail e use POST /auth/verify com o código de 6 dígitos.",
            requiresVerification: true,
        });
    });
    /**
     * POST /auth/login
     *
     * Com password    -> valida senha e retorna JWT
     * Sem password    -> envia código por e-mail (mesmo para usuários com senha cadastrada)
     */
    app.post("/login", async (request, reply) => {
        const result = loginSchema.safeParse(request.body);
        if (!result.success) {
            return reply.status(400).send({ error: result.error.flatten() });
        }
        const { email, password } = result.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            // Resposta genérica para não vazar se e-mail existe
            return reply.status(401).send({ error: "Credenciais inválidas" });
        }
        // Fluxo com senha
        if (password) {
            if (!user.password) {
                return reply.status(400).send({
                    error: "Esta conta não possui senha. Use o fluxo de código por e-mail.",
                });
            }
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                return reply.status(401).send({ error: "Credenciais inválidas" });
            }
            const token = app.jwt.sign({ sub: user.id, email: user.email });
            return reply.send({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    codeuniq: user.codeuniq,
                },
                token,
            });
        }
        // Fluxo sem senha -> envia código
        await issueAndSendCode(user.id, email, user.name);
        return reply.send({
            message: "Código enviado para seu e-mail. Use POST /auth/verify para autenticar.",
            requiresVerification: true,
        });
    });
    /**
     * POST /auth/verify
     *
     * Valida o código de 6 dígitos enviado por e-mail e retorna o JWT.
     * Funciona tanto para register quanto para login sem senha.
     */
    app.post("/verify", async (request, reply) => {
        const result = verifyCodeSchema.safeParse(request.body);
        if (!result.success) {
            return reply.status(400).send({ error: result.error.flatten() });
        }
        const { email, code } = result.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return reply.status(401).send({ error: "Código inválido ou expirado" });
        }
        // Busca o código mais recente ainda válido e não usado
        const verification = await prisma.verificationCode.findFirst({
            where: {
                userId: user.id,
                code,
                usedAt: null,
                expiresAt: { gt: new Date() },
            },
            orderBy: { createdAt: "desc" },
        });
        if (!verification) {
            return reply.status(401).send({ error: "Código inválido ou expirado" });
        }
        // Marca como usado
        await prisma.verificationCode.update({
            where: { id: verification.id },
            data: { usedAt: new Date() },
        });
        const token = app.jwt.sign({ sub: user.id, email: user.email });
        return reply.send({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                codeuniq: user.codeuniq,
            },
            token,
        });
    });
    /**
     * POST /auth/resend-code
     *
     * Reenvia o código para o e-mail (caso tenha expirado).
     */
    app.post("/resend-code", async (request, reply) => {
        const result = loginSchema.pick({ email: true }).safeParse(request.body);
        if (!result.success) {
            return reply.status(400).send({ error: result.error.flatten() });
        }
        const { email } = result.data;
        const user = await prisma.user.findUnique({ where: { email } });
        // Resposta genérica — não revela se o e-mail existe
        if (!user) {
            return reply.send({
                message: "Se o e-mail existir, um novo código será enviado.",
            });
        }
        await issueAndSendCode(user.id, email, user.name);
        return reply.send({ message: "Novo código enviado para seu e-mail." });
    });
    // GET /auth/me
    app.get("/me", { onRequest: [app.authenticate] }, async (request, reply) => {
        const { sub } = request.user;
        const user = await prisma.user.findUnique({
            where: { id: sub },
            include: {
                accounts: true,
                budgets: true,
                transactions: true,
                financings: true,
            },
        });
        if (!user)
            return reply.status(404).send({ error: "Usuário não encontrado" });
        return reply.send({ user });
    });
}
// Cria o código no banco, invalida os anteriores e envia o e-mail
async function issueAndSendCode(userId, email, name) {
    // Invalida códigos anteriores não usados
    await prisma.verificationCode.updateMany({
        where: { userId, usedAt: null },
        data: { usedAt: new Date() },
    });
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos
    await prisma.verificationCode.create({
        data: { userId, code, expiresAt },
    });
    await sendVerificationEmail({ to: email, code, userName: name });
}
//# sourceMappingURL=auth.routes.js.map