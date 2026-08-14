import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "../lib/prisma";
import { summaryQuerySchema } from "../schemas/summary";
import { getFinancings } from "../services/financing.service";
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek, } from "../utils/dates";
export async function summaryRoutes(app) {
    const auth = { onRequest: [app.authenticate] };
    /**
     * GET /summary
     *
     * Retorna o resumo completo do usuário:
     * - Gastos da semana atual e do mês atual
     * - Receitas do mês
     * - Saldo total das contas
     * - Saldo + salário (quanto "sobra" após descontar gastos do mês)
     * - Progresso de cada orçamento ativo
     * - Top categorias do mês
     * - Financiamentos ativos e suas parcelas
     */
    app.get("/", auth, async (request, reply) => {
        const { sub: userId } = request.user;
        const result = summaryQuerySchema.safeParse(request.query);
        if (!result.success) {
            return reply.status(400).send({ error: result.error.flatten() });
        }
        const { accountId } = result.data;
        const now = new Date();
        const weekStart = startOfWeek(now);
        const weekEnd = endOfWeek(now);
        const monthStart = startOfMonth(now);
        const monthEnd = endOfMonth(now);
        const baseWhere = {
            userId,
            ...(accountId && { accountId }),
        };
        // ── Consultas paralelas
        const [weekExpenses, weekIncome, monthExpenses, monthIncome, accounts, activeBudgets, topCategories, financingsResult,] = await Promise.all([
            // Gastos da semana
            prisma.transaction.aggregate({
                where: {
                    ...baseWhere,
                    type: "EXPENSE",
                    date: { gte: weekStart, lte: weekEnd },
                },
                _sum: { amount: true },
            }),
            // Receitas da semana
            prisma.transaction.aggregate({
                where: {
                    ...baseWhere,
                    type: "INCOME",
                    date: { gte: weekStart, lte: weekEnd },
                },
                _sum: { amount: true },
            }),
            // Gastos do mês
            prisma.transaction.aggregate({
                where: {
                    ...baseWhere,
                    type: "EXPENSE",
                    date: { gte: monthStart, lte: monthEnd },
                },
                _sum: { amount: true },
            }),
            // Receitas do mês
            prisma.transaction.aggregate({
                where: {
                    ...baseWhere,
                    type: "INCOME",
                    date: { gte: monthStart, lte: monthEnd },
                },
                _sum: { amount: true },
            }),
            // Contas do usuário
            prisma.account.findMany({
                where: { userId, ...(accountId && { id: accountId }) },
            }),
            // Orçamentos ativos no período atual
            prisma.budget.findMany({
                where: {
                    userId,
                    startDate: { lte: now },
                    endDate: { gte: now },
                },
            }),
            // Top 5 categorias com mais gasto no mês
            prisma.transaction.groupBy({
                by: ["categoryId"],
                where: {
                    ...baseWhere,
                    type: "EXPENSE",
                    date: { gte: monthStart, lte: monthEnd },
                },
                _sum: { amount: true },
                orderBy: { _sum: { amount: "desc" } },
                take: 5,
            }),
            // Financiamentos ativos (todos, sem filtro — filtragem fica no front se precisar)
            getFinancings(userId, "all"),
        ]);
        // accounts
        const accountsWithBalance = await Promise.all(accounts.map(async (account) => {
            const [incomeSum, expenseSum] = await Promise.all([
                prisma.transaction.aggregate({
                    where: { accountId: account.id, type: "INCOME" },
                    _sum: { amount: true },
                }),
                prisma.transaction.aggregate({
                    where: { accountId: account.id, type: "EXPENSE" },
                    _sum: { amount: true },
                }),
            ]);
            const income = (incomeSum._sum.amount ?? new Decimal(0)).toNumber();
            const expense = (expenseSum._sum.amount ?? new Decimal(0)).toNumber();
            const balance = income - expense;
            const initialBalance = account.initialBalance.toNumber();
            return {
                ...account,
                initialBalance,
                salary: account.salary?.toNumber() ?? null,
                balance,
                realBalance: initialBalance + balance,
            };
        }));
        const totalRealBalance = accountsWithBalance.reduce((s, a) => s + a.realBalance, 0);
        const totalSalary = accounts.reduce((s, a) => s + (a.salary?.toNumber() ?? 0), 0);
        const totalMonthExpenses = (monthExpenses._sum.amount ?? new Decimal(0)).toNumber();
        const totalMonthIncome = (monthIncome._sum.amount ?? new Decimal(0)).toNumber();
        const totalWeekExpenses = (weekExpenses._sum.amount ?? new Decimal(0)).toNumber();
        const totalWeekIncome = (weekIncome._sum.amount ?? new Decimal(0)).toNumber();
        const projectedBalance = totalRealBalance + totalSalary - totalMonthExpenses;
        // ── Progresso dos orçamentos ativos
        const budgetsProgress = await Promise.all(activeBudgets.map(async (budget) => {
            const spent = await prisma.transaction.aggregate({
                where: {
                    userId,
                    type: "EXPENSE",
                    ...(budget.categoryId && { categoryId: budget.categoryId }),
                    date: { gte: budget.startDate, lte: budget.endDate },
                },
                _sum: { amount: true },
            });
            const spentAmount = (spent._sum.amount ?? new Decimal(0)).toNumber();
            const budgetAmount = budget.amount.toNumber();
            const percentage = Math.min((spentAmount / budgetAmount) * 100, 100);
            return {
                id: budget.id,
                name: budget.name,
                period: budget.period,
                categoryId: budget.categoryId,
                amount: budgetAmount,
                limit: budgetAmount,
                spentAmount,
                remaining: budgetAmount - spentAmount,
                percentage: Math.round(percentage * 10) / 10,
                status: percentage >= 100
                    ? "exceeded"
                    : percentage >= 80
                        ? "warning"
                        : "ok",
            };
        }));
        // ── Resolve nomes das categorias
        const categoryIds = topCategories
            .map((c) => c.categoryId)
            .filter(Boolean);
        const categories = categoryIds.length
            ? await prisma.category.findMany({ where: { id: { in: categoryIds } } })
            : [];
        const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));
        const topSpendingCategories = topCategories.map((c) => ({
            category: c.categoryId ? (categoryMap[c.categoryId] ?? null) : null,
            total: (c._sum.amount ?? new Decimal(0)).toNumber(),
        }));
        // ── Financiamentos: parcelas vencendo no mês atual e parcelas vencidas
        const { financings, summary: financingsSummary } = financingsResult;
        const installmentsDueThisMonth = financings.flatMap((f) => f.installmentsData
            .filter((i) => !i.isPaid &&
            new Date(i.dueDate) >= monthStart &&
            new Date(i.dueDate) <= monthEnd)
            .map((i) => ({
            financingId: f.id,
            installmentNumber: i.number,
            amount: i.amount,
            dueDate: i.dueDate,
        })));
        const overdueInstallments = financings.flatMap((f) => f.installmentsData
            .filter((i) => !i.isPaid && new Date(i.dueDate) < now)
            .map((i) => ({
            financingId: f.id,
            installmentNumber: i.number,
            amount: i.amount,
            dueDate: i.dueDate,
        })));
        const totalDueThisMonth = Number(installmentsDueThisMonth.reduce((s, i) => s + i.amount, 0).toFixed(2));
        const totalOverdue = Number(overdueInstallments.reduce((s, i) => s + i.amount, 0).toFixed(2));
        return reply.send({
            period: {
                weekStart: weekStart.toISOString(),
                weekEnd: weekEnd.toISOString(),
                monthStart: monthStart.toISOString(),
                monthEnd: monthEnd.toISOString(),
            },
            week: {
                totalExpenses: totalWeekExpenses,
                totalIncome: totalWeekIncome,
                balance: totalWeekIncome - totalWeekExpenses,
            },
            month: {
                totalExpenses: totalMonthExpenses,
                totalIncome: totalMonthIncome,
                balance: totalMonthIncome - totalMonthExpenses,
            },
            accounts: {
                list: accountsWithBalance, // ← era `accounts`, agora tem balance e realBalance
                totalSalary,
                totalRealBalance, // soma dos realBalance de cada conta
                projectedBalance,
            },
            budgets: budgetsProgress,
            topSpendingCategories,
            financings: {
                list: financings,
                totalAmount: financingsSummary.totalAmount,
                totalPayable: financingsSummary.totalPayable,
                totalPaid: financingsSummary.totalPaid,
                totalRemaining: financingsSummary.totalRemaining,
                dueThisMonth: {
                    count: installmentsDueThisMonth.length,
                    total: totalDueThisMonth,
                    installments: installmentsDueThisMonth,
                },
                overdue: {
                    count: overdueInstallments.length,
                    total: totalOverdue,
                    installments: overdueInstallments,
                },
            },
        });
    });
}
//# sourceMappingURL=summary.routes.js.map