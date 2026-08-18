import { prisma } from "../lib/prisma";
import { createAccountSchema, updateAccountSchema } from "../schemas/accounts";
import { computeBalance } from "../utils/account-balance";
import { randomUUID } from "../utils/random_uuid";
export async function accountRoutes(app) {
    const auth = { onRequest: [app.authenticate] };
    // GET /accounts (supports optional ?updatedSince=ISO)
    app.get("/", auth, async (request, reply) => {
        const { sub: userId } = request.user;
        const { updatedSince } = request.query ?? {};
        const where = { userId };
        if (updatedSince) {
            const sinceDate = new Date(updatedSince);
            if (!isNaN(sinceDate.getTime())) {
                where.updatedAt = { gt: sinceDate };
            }
        }
        const accounts = await prisma.account.findMany({
            where,
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
        const totalRealBalance = accountsWithBalance.reduce((sum, a) => sum + a.realBalance, 0);
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
            data: { id: result.data.id ?? randomUUID(), ...result.data, userId },
        });
        return reply.status(201).send({
            account: { ...account, balance: 0, realBalance: account.initialBalance },
        });
    });
    // PUT /accounts/:id  (upsert by client-provided id)
    app.put("/:id", auth, async (request, reply) => {
        const { sub: userId } = request.user;
        const { id } = request.params;
        const result = createAccountSchema.safeParse(request.body);
        if (!result.success)
            return reply.status(400).send({ error: result.error.flatten() });
        // check if exists for this user
        const exists = await prisma.account.findFirst({ where: { id, userId } });
        if (exists) {
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
                    balance: txBalance.toNumber(),
                    realBalance: account.initialBalance.plus(txBalance).toNumber(),
                },
            });
        }
        // create with provided id and userId
        const account = await prisma.account.create({
            data: { id, ...result.data, userId },
        });
        return reply.status(201).send({
            account: {
                ...account,
                balance: 0,
                realBalance: account.initialBalance,
            },
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
    app.delete("/:id?", auth, async (request, reply) => {
        const { sub: userId } = request.user;
        const { id } = request.params;
        const { ids } = request.body ?? {};
        // Normaliza para sempre trabalhar com array
        const targets = id ? [id] : (ids ?? []);
        if (!targets.length)
            return reply.status(400).send({ error: "Informe id ou ids" });
        const found = await prisma.account.findMany({
            where: { id: { in: targets }, userId },
            select: { id: true },
        });
        if (found.length !== targets.length)
            return reply
                .status(404)
                .send({ error: "Uma ou mais contas não encontradas" });
        await prisma.account.deleteMany({
            where: { id: { in: targets }, userId },
        });
        return reply.status(204).send();
    });
}
//# sourceMappingURL=accounts.routes.js.map