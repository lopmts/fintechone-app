import { prisma } from "../lib/prisma";
import { createAccountSchema, updateAccountSchema } from "../schemas";
import { computeBalance } from "../utils/account-balance";
export async function accountRoutes(app) {
    const auth = { onRequest: [app.authenticate] };
    // GET /accounts
    app.get("/", auth, async (request, reply) => {
        const { sub: userId } = request.user;
        const accounts = await prisma.account.findMany({
            where: { userId },
            orderBy: { createdAt: "asc" },
        });
        const accountsWithBalance = await Promise.all(accounts.map(async (a) => {
            const txBalance = await computeBalance(a.id);
            const realBalance = a.initialBalance.plus(txBalance);
            return {
                ...a,
                initialBalance: a.initialBalance.toNumber(),
                salary: a.salary?.toNumber() ?? null,
                balance: txBalance.toNumber(),
                realBalance: realBalance.toNumber(),
            };
        }));
        const totalRealBalance = accountsWithBalance.reduce((sum, a) => sum + a.realBalance, // já são numbers aqui
        0);
        const totalSalary = accountsWithBalance.reduce((sum, a) => sum + (a.salary ?? 0), 0);
        return reply.send({
            accounts: accountsWithBalance,
            totalRealBalance,
            totalSalary,
        });
    });
    // POST /accounts
    app.post("/", auth, async (request, reply) => {
        const { sub: userId } = request.user;
        const result = createAccountSchema.safeParse(request.body);
        if (!result.success)
            return reply.status(400).send({ error: result.error.flatten() });
        const account = await prisma.account.create({
            data: { ...result.data, userId },
        });
        return reply.status(201).send({
            account: { ...account, balance: 0, realBalance: account.initialBalance },
        });
    });
    // GET /accounts/:id
    app.get("/:id", auth, async (request, reply) => {
        const { sub: userId } = request.user;
        const { id } = request.params;
        const account = await prisma.account.findFirst({ where: { id, userId } });
        if (!account)
            return reply.status(404).send({ error: "Conta não encontrada" });
        const txBalance = await computeBalance(id);
        return reply.send({
            account: {
                ...account,
                initialBalance: account.initialBalance.toNumber(),
                salary: account.salary?.toNumber() ?? null,
                balance: txBalance.toNumber(),
                realBalance: account.initialBalance.plus(txBalance).toNumber(),
            },
        });
    });
    // PATCH /accounts/:id
    app.patch("/:id", auth, async (request, reply) => {
        const { sub: userId } = request.user;
        const { id } = request.params;
        const result = updateAccountSchema.safeParse(request.body);
        if (!result.success)
            return reply.status(400).send({ error: result.error.flatten() });
        const exists = await prisma.account.findFirst({ where: { id, userId } });
        if (!exists)
            return reply.status(404).send({ error: "Conta não encontrada" });
        const account = await prisma.account.update({
            where: { id },
            data: result.data,
        });
        const txBalance = await computeBalance(id);
        return reply.send({
            account: {
                ...account,
                initialBalance: account.initialBalance.toNumber(),
                salary: account.salary?.toNumber() ?? null,
                balance: 0,
                realBalance: account.initialBalance.toNumber(),
            },
        });
    });
    // DELETE /accounts/:id
    app.delete("/:id", auth, async (request, reply) => {
        const { sub: userId } = request.user;
        const { id } = request.params;
        const exists = await prisma.account.findFirst({ where: { id, userId } });
        if (!exists)
            return reply.status(404).send({ error: "Conta não encontrada" });
        await prisma.account.delete({ where: { id } });
        return reply.status(204).send();
    });
}
//# sourceMappingURL=accounts.routes.js.map