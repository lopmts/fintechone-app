import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "../lib/prisma";
import { createBudgetSchema, updateBudgetSchema } from "../schemas";
export async function budgetRoutes(app) {
    const auth = { onRequest: [app.authenticate] };
    // GET /budgets  — lista orçamentos com progresso atual
    // GET /budgets  — lista orçamentos com progresso atual
    // GET /budgets  — lista orçamentos com progresso atual
    app.get("/", auth, async (request, reply) => {
        const { sub: userId } = request.user;
        const budgets = await prisma.budget.findMany({
            where: { userId },
            orderBy: { startDate: "desc" },
        });
        const budgetsWithProgress = await Promise.all(budgets.map(async (budget) => {
            const whereFilter = {
                userId,
                date: {
                    gte: budget.startDate,
                    lte: budget.endDate,
                },
                type: "EXPENSE",
            };
            if (budget.categoryId) {
                whereFilter.categoryId = budget.categoryId;
            }
            const spent = await prisma.transaction.aggregate({
                where: whereFilter,
                _sum: {
                    amount: true,
                },
            });
            const spentAmount = spent._sum?.amount ?? new Decimal(0);
            const remaining = budget.amount.minus(spentAmount);
            const percentage = spentAmount.div(budget.amount).mul(100);
            const percentageNumber = Math.min(percentage.toNumber(), 100);
            return {
                ...budget,
                amount: budget.amount.toNumber(),
                spentAmount: spentAmount.toNumber(),
                remaining: remaining.toNumber(),
                percentage: Math.round(percentageNumber * 10) / 10,
                status: percentageNumber >= 100
                    ? "exceeded"
                    : percentageNumber >= 80
                        ? "warning"
                        : "ok",
            };
        }));
        return reply.send({ budgets: budgetsWithProgress });
    });
    // POST /budgets
    app.post("/", auth, async (request, reply) => {
        const { sub: userId } = request.user;
        const result = createBudgetSchema.safeParse(request.body);
        if (!result.success) {
            return reply.status(400).send({ error: result.error.flatten() });
        }
        const { startDate, endDate, ...rest } = result.data;
        const budget = await prisma.budget.create({
            data: {
                ...rest,
                userId,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            },
        });
        return reply.status(201).send({ budget });
    });
    // PATCH /budgets/:id
    app.patch("/:id", auth, async (request, reply) => {
        const { sub: userId } = request.user;
        const { id } = request.params;
        const result = updateBudgetSchema.safeParse(request.body);
        if (!result.success) {
            return reply.status(400).send({ error: result.error.flatten() });
        }
        const exists = await prisma.budget.findFirst({ where: { id, userId } });
        if (!exists)
            return reply.status(404).send({ error: "Orçamento não encontrado" });
        const { startDate, endDate, ...rest } = result.data;
        const budget = await prisma.budget.update({
            where: { id },
            data: {
                ...rest,
                ...(startDate && { startDate: new Date(startDate) }),
                ...(endDate && { endDate: new Date(endDate) }),
            },
        });
        return reply.send({ budget });
    });
    // DELETE /budgets/:id
    app.delete("/:id?", auth, async (request, reply) => {
        const { sub: userId } = request.user;
        const { id } = request.params;
        const { ids } = (request.body ?? {});
        // ── exclusão em lote
        if (ids && ids.length > 0) {
            const found = await prisma.budget.findMany({
                where: { id: { in: ids }, userId },
                select: { id: true },
            });
            if (found.length !== ids.length) {
                const foundIds = found.map((b) => b.id);
                const missing = ids.filter((i) => !foundIds.includes(i));
                return reply
                    .status(404)
                    .send({ error: "Orçamentos não encontrados", missing });
            }
            await prisma.budget.deleteMany({ where: { id: { in: ids }, userId } });
            return reply.status(204).send();
        }
        // ── exclusão única
        if (id) {
            const exists = await prisma.budget.findFirst({ where: { id, userId } });
            if (!exists)
                return reply.status(404).send({ error: "Orçamento não encontrado" });
            await prisma.budget.delete({ where: { id } });
            return reply.status(204).send();
        }
        return reply.status(400).send({ error: "Informe id ou ids para exclusão" });
    });
}
//# sourceMappingURL=budgets.routes.js.map