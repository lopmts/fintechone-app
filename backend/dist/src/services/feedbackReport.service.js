import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "../lib/prisma";
import { sendFeedbackEmail } from "./feedback-mailer.service";
export async function calcSummary(userId, from, to) {
    const transactions = await prisma.transaction.findMany({
        where: {
            userId,
            date: { gte: from, lte: to },
        },
        include: { category: true },
    });
    let totalIncome = new Decimal(0);
    let totalExpense = new Decimal(0);
    const categoryMap = new Map();
    for (const tx of transactions) {
        if (tx.type === "INCOME") {
            totalIncome = totalIncome.plus(tx.amount);
        }
        else {
            totalExpense = totalExpense.plus(tx.amount);
            if (tx.category) {
                const key = tx.category.id;
                const existing = categoryMap.get(key);
                if (existing) {
                    categoryMap.set(key, {
                        ...existing,
                        total: existing.total.plus(tx.amount),
                    });
                }
                else {
                    categoryMap.set(key, {
                        name: tx.category.name,
                        icon: tx.category.icon,
                        color: tx.category.color,
                        total: tx.amount,
                    });
                }
            }
        }
    }
    return {
        totalIncome,
        totalExpense,
        net: totalIncome.minus(totalExpense),
        byCategory: Array.from(categoryMap.values()).sort((a, b) => b.total.comparedTo(a.total)),
    };
}
export async function sendWeeklyReport() {
    const now = new Date();
    const from = new Date(now);
    from.setDate(now.getDate() - 7);
    const users = await prisma.user.findMany({
        where: { isActive: true },
        select: { id: true, name: true, email: true },
    });
    for (const user of users) {
        const summary = await calcSummary(user.id, from, now);
        // Só envia se tiver ao menos 1 transação
        const hasActivity = summary.totalIncome.gt(0) || summary.totalExpense.gt(0);
        if (!hasActivity)
            continue;
        await sendFeedbackEmail({
            email: user.email, // era "to"
            name: user.name ?? "Usuário",
            period: "semanal",
            startDate: from, // era "from"
            endDate: now, // era "to"
            summary,
        });
    }
}
export async function sendMonthlyReport() {
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth(), 1);
    const users = await prisma.user.findMany({
        where: { isActive: true },
        select: { id: true, name: true, email: true },
    });
    for (const user of users) {
        const summary = await calcSummary(user.id, from, now);
        const hasActivity = summary.totalIncome.gt(0) || summary.totalExpense.gt(0);
        if (!hasActivity)
            continue;
        await sendFeedbackEmail({
            email: user.email, // era "to"
            name: user.name ?? "Usuário",
            period: "mensal",
            startDate: from, // era "from"
            endDate: now, // era "to"
            summary,
        });
    }
}
//# sourceMappingURL=feedbackReport.service.js.map