import { z } from "zod";
import { prisma } from "../lib/prisma";
import { sendDeleteWarningEmail, sendReactivateCodeEmail, } from "../services/email.service";
const DELETE_GRACE_DAYS = 7; // dias até exclusão definitiva
function generateCode() {
    return String(Math.floor(100000 + Math.random() * 900000));
}
export async function deleteAccountRoutes(app) {
    /**
     * DELETE /users/me
     * Solicita exclusão da conta — cria DeleteRequest e envia e-mail de aviso.
     * Requer autenticação.
     */
    app.delete("/users/me", { onRequest: [app.authenticate] }, async (request, reply) => {
        const { sub } = request.user;
        const user = await prisma.user.findUnique({
            where: { id: sub },
            select: { id: true, name: true, email: true },
        });
        if (!user) {
            return reply.status(404).send({ error: "Usuário não encontrado" });
        }
        // Idempotente: se já existe uma solicitação ativa, só retorna ela
        const existing = await prisma.deleteRequest.findUnique({
            where: { userId: user.id },
        });
        if (existing) {
            return reply.send({
                message: "Solicitação de exclusão já registrada.",
                expiresAt: existing.expiresAt,
            });
        }
        const expiresAt = new Date(Date.now() + DELETE_GRACE_DAYS * 24 * 60 * 60 * 1000);
        await prisma.deleteRequest.create({
            data: { userId: user.id, expiresAt },
        });
        // Desativa a conta imediatamente para bloquear novos logins
        await prisma.user.update({
            where: { id: user.id },
            data: { isActive: false },
        });
        await sendDeleteWarningEmail({
            to: user.email,
            userName: user.name,
            expiresAt,
        });
        return reply.status(202).send({
            message: `Conta marcada para exclusão. Você tem ${DELETE_GRACE_DAYS} dias para cancelar.`,
            expiresAt,
        });
    });
    /**
     * POST /users/me/reactivate
     * Solicita reativação — envia código de 6 dígitos por e-mail.
     * Não requer JWT (usuário pode estar deslogado).
     */
    app.post("/users/me/reactivate", {
        schema: {
            body: z.object({ email: z.string().email() }),
        },
    }, async (request, reply) => {
        const { email } = request.body;
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, name: true, email: true },
        });
        // Resposta genérica — não revela se o e-mail existe
        if (!user) {
            return reply.send({
                message: "Se o e-mail existir, um código será enviado.",
            });
        }
        const deleteRequest = await prisma.deleteRequest.findUnique({
            where: { userId: user.id },
        });
        if (!deleteRequest) {
            return reply.status(400).send({
                error: "Nenhuma solicitação de exclusão pendente para este e-mail.",
            });
        }
        if (deleteRequest.expiresAt < new Date()) {
            return reply.status(410).send({
                error: "O prazo de reativação expirou. A conta foi excluída.",
            });
        }
        // Invalida códigos de verificação anteriores e emite novo
        await prisma.verificationCode.updateMany({
            where: { userId: user.id, usedAt: null },
            data: { usedAt: new Date() },
        });
        const code = generateCode();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos
        await prisma.verificationCode.create({
            data: { userId: user.id, code, expiresAt },
        });
        await sendReactivateCodeEmail({
            to: user.email,
            userName: user.name,
            code,
        });
        return reply.send({
            message: "Código de reativação enviado para seu e-mail.",
        });
    });
    /**
     * POST /users/me/reactivate/verify
     * Valida o código e reativa a conta — remove DeleteRequest e reativa isActive.
     */
    app.post("/users/me/reactivate/verify", {
        schema: {
            body: z.object({
                email: z.string().email(),
                code: z.string().length(6),
            }),
        },
    }, async (request, reply) => {
        const { email, code } = request.body;
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, name: true, email: true, codeuniq: true },
        });
        if (!user) {
            return reply.status(401).send({ error: "Código inválido ou expirado" });
        }
        // Verifica se ainda está dentro do prazo de graça
        const deleteRequest = await prisma.deleteRequest.findUnique({
            where: { userId: user.id },
        });
        if (!deleteRequest || deleteRequest.expiresAt < new Date()) {
            return reply.status(410).send({
                error: "O prazo de reativação expirou.",
            });
        }
        // Valida o código
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
        // Tudo certo — reativa em transação atômica
        await prisma.$transaction([
            prisma.verificationCode.update({
                where: { id: verification.id },
                data: { usedAt: new Date() },
            }),
            prisma.deleteRequest.delete({
                where: { userId: user.id },
            }),
            prisma.user.update({
                where: { id: user.id },
                data: { isActive: true },
            }),
        ]);
        const token = app.jwt.sign({ sub: user.id, email: user.email });
        return reply.send({
            message: "Conta reativada com sucesso!",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                codeuniq: user.codeuniq,
            },
            token,
        });
    });
}
//# sourceMappingURL=delete-account.routes.js.map