import { Prisma, PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();
// ─── Helpers
/**
 * Calcula o valor da parcela usando a fórmula Price (SAC simplificado).
 * PMT = PV * [i(1+i)^n] / [(1+i)^n - 1]
 */
function calcInstallmentAmount(principal, monthlyRate, totalInstallments) {
    if (monthlyRate === 0)
        return principal / totalInstallments;
    const r = monthlyRate / 100;
    const factor = Math.pow(1 + r, totalInstallments);
    return (principal * (r * factor)) / (factor - 1);
}
/**
 * Retorna a data de vencimento de uma parcela (startDate + N meses).
 */
function getDueDate(startDate, installmentNumber) {
    const d = new Date(startDate);
    d.setMonth(d.getMonth() + installmentNumber);
    return d;
}
// ─── Service
export async function createFinancing(input) {
    const installmentAmount = calcInstallmentAmount(input.amount, input.interestRate, input.installments);
    const financing = await prisma.financing.create({
        data: {
            userId: input.userId,
            amount: new Prisma.Decimal(input.amount),
            interestRate: new Prisma.Decimal(input.interestRate),
            installments: input.installments,
            startDate: input.startDate,
        },
    });
    return {
        ...financing,
        installmentAmount: Number(installmentAmount.toFixed(2)),
        totalPayable: Number((installmentAmount * input.installments).toFixed(2)),
    };
}
export async function getFinancings(userId, filter = "all") {
    const financings = await prisma.financing.findMany({
        where: { userId, isActive: true },
        include: { installmentsPaid: true },
        orderBy: { startDate: "asc" },
    });
    const now = new Date();
    const enriched = financings.map((f) => {
        const paidNumbers = new Set(f.installmentsPaid.map((i) => i.installmentNumber));
        const rate = Number(f.interestRate);
        const principal = Number(f.amount);
        const n = f.installments;
        const installmentAmount = calcInstallmentAmount(principal, rate, n);
        const installmentsList = Array.from({ length: n }, (_, idx) => {
            const num = idx + 1;
            const dueDate = getDueDate(f.startDate, idx); // parcela 1 → startDate + 0 meses
            const paid = paidNumbers.has(num);
            const overdue = !paid && dueDate < now;
            const paidEntry = f.installmentsPaid.find((i) => i.installmentNumber === num);
            return {
                installmentNumber: num,
                dueDate,
                amount: Number(installmentAmount.toFixed(2)),
                paid,
                overdue,
                paidAt: paidEntry?.paidAt ?? null,
            };
        });
        const paidCount = installmentsList.filter((i) => i.paid).length;
        const overdueCount = installmentsList.filter((i) => i.overdue).length;
        const remainingCount = installmentsList.filter((i) => !i.paid).length;
        const totalPaid = paidCount * installmentAmount;
        const totalRemaining = remainingCount * installmentAmount;
        const totalPayable = n * installmentAmount;
        return {
            id: f.id,
            userId: f.userId,
            isActive: f.isActive,
            amount: principal,
            interestRate: rate,
            installments: n,
            startDate: f.startDate,
            createdAt: f.createdAt,
            installmentAmount: Number(installmentAmount.toFixed(2)),
            totalPayable: Number(totalPayable.toFixed(2)),
            totalPaid: Number(totalPaid.toFixed(2)),
            totalRemaining: Number(totalRemaining.toFixed(2)),
            paidCount,
            overdueCount,
            remainingCount,
            isFullyPaid: paidCount === n,
            installmentsList,
        };
    });
    // ── Filtragem ──
    const filtered = enriched.filter((f) => {
        if (filter === "paid")
            return f.isFullyPaid;
        if (filter === "unpaid")
            return !f.isFullyPaid;
        if (filter === "overdue")
            return f.overdueCount > 0;
        return true; // "all"
    });
    // ── Totais do conjunto retornado ──
    const summary = {
        count: filtered.length,
        totalAmount: Number(filtered
            .reduce((s, f) => s + f.amount, 0)
            .toFixed(2)),
        totalPayable: Number(filtered
            .reduce((s, f) => s + f.totalPayable, 0)
            .toFixed(2)),
        totalPaid: Number(filtered.reduce((s, f) => s + f.totalPaid, 0).toFixed(2)),
        totalRemaining: Number(filtered.reduce((s, f) => s + f.totalRemaining, 0).toFixed(2)),
    };
    return { financings: filtered, summary };
}
export async function getFinancingById(userId, financingId) {
    const f = await prisma.financing.findFirst({
        where: { id: financingId, userId },
        include: { installmentsPaid: true },
    });
    if (!f)
        return null;
    const { financings } = await getFinancings(userId, "all");
    return financings.find((x) => x.id === financingId) ?? null;
}
/**
 * Marca múltiplas parcelas como pagas de uma vez.
 * Ignora silenciosamente parcelas já pagas (idempotente).
 */
export async function markInstallmentsPaid(input) {
    const financing = await prisma.financing.findUnique({
        where: { id: input.financingId },
        include: { installmentsPaid: true },
    });
    if (!financing)
        throw new Error("Financing not found");
    const alreadyPaid = new Set(financing.installmentsPaid.map((i) => i.installmentNumber));
    const toCreate = input.installmentNumbers
        .filter((n) => n >= 1 && n <= financing.installments && !alreadyPaid.has(n))
        .map((n) => {
        const installmentAmount = calcInstallmentAmount(Number(financing.amount), Number(financing.interestRate), financing.installments);
        return {
            financingId: financing.id,
            installmentNumber: n,
            amount: new Prisma.Decimal(installmentAmount.toFixed(2)),
            paidAt: input.paidAt ?? new Date(),
        };
    });
    if (toCreate.length === 0) {
        return {
            created: 0,
            message: "All selected installments were already paid.",
        };
    }
    await prisma.installmentsPaid.createMany({ data: toCreate });
    // Se todas as parcelas estão pagas, marca o financiamento como inativo
    const totalPaidAfter = await prisma.installmentsPaid.count({
        where: { financingId: financing.id },
    });
    if (totalPaidAfter >= financing.installments) {
        await prisma.financing.update({
            where: { id: financing.id },
            data: { isActive: false },
        });
    }
    return {
        created: toCreate.length,
        installmentNumbers: toCreate.map((i) => i.installmentNumber),
    };
}
export async function deleteFinancing(userId, financingId) {
    const f = await prisma.financing.findFirst({
        where: { id: financingId, userId },
    });
    if (!f)
        return false;
    await prisma.financing.delete({ where: { id: financingId } });
    return true;
}
//# sourceMappingURL=financing.service.js.map