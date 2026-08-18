import { Prisma, PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();
// ─── Helpers
/**
 * Retorna a data de vencimento de uma parcela (startDate + N meses).
 */
function getDueDate(startDate, installmentNumber) {
    const d = new Date(startDate);
    d.setMonth(d.getMonth() + installmentNumber);
    return d;
}
/**
 * Conta quantos dias inteiros se passaram entre dueDate e referenceDate.
 */
function daysBetween(dueDate, referenceDate) {
    const msPerDay = 1000 * 60 * 60 * 24;
    const diff = referenceDate.getTime() - dueDate.getTime();
    return diff > 0 ? Math.floor(diff / msPerDay) : 0;
}
/**
 * Calcula a penalidade (multa única + mora diária) de uma parcela vencida.
 */
function calcPenalty(installmentAmount, dueDate, referenceDate, lateFeeRate, lateInterestRate) {
    const daysLate = daysBetween(dueDate, referenceDate);
    if (daysLate === 0) {
        return {
            daysLate: 0,
            lateFeeApplied: 0,
            lateInterestApplied: 0,
            totalWithPenalty: installmentAmount,
        };
    }
    const lateFeeApplied = lateFeeRate
        ? Number(((installmentAmount * lateFeeRate) / 100).toFixed(2))
        : 0;
    const lateInterestApplied = lateInterestRate
        ? Number(((installmentAmount * lateInterestRate * daysLate) / 100).toFixed(2))
        : 0;
    const totalWithPenalty = Number((installmentAmount + lateFeeApplied + lateInterestApplied).toFixed(2));
    return { daysLate, lateFeeApplied, lateInterestApplied, totalWithPenalty };
}
/**
 * Monta o objeto FinancingWithInstallments a partir do registro do banco.
 * installmentAmount agora vem direto do banco (não é mais calculado).
 */
function buildFinancingWithInstallments(f) {
    const now = new Date();
    const principal = Number(f.amount);
    const installmentAmount = Number(f.installmentAmount);
    const interestRate = f.interestRate != null ? Number(f.interestRate) : null;
    const n = f.installments;
    const lateFeeRate = f.lateFeeRate != null ? Number(f.lateFeeRate) : null;
    const lateInterestRate = f.lateInterestRate != null ? Number(f.lateInterestRate) : null;
    const paidByNumber = new Map(f.installmentsPaid.map((p) => [p.installmentNumber, p]));
    const installmentsData = Array.from({ length: n }, (_, idx) => {
        const number = idx + 1;
        const dueDate = getDueDate(f.startDate, idx);
        const paidEntry = paidByNumber.get(number);
        const isPaid = !!paidEntry;
        const referenceDate = paidEntry ? paidEntry.paidAt : now;
        const penalty = calcPenalty(installmentAmount, dueDate, referenceDate, lateFeeRate, lateInterestRate);
        return {
            number,
            dueDate,
            amount: installmentAmount,
            isPaid,
            paidAmount: paidEntry ? Number(paidEntry.amount) : undefined,
            paidAt: paidEntry?.paidAt,
            ...(penalty.daysLate > 0 ? penalty : {}),
        };
    });
    const paidInstallments = installmentsData.filter((i) => i.isPaid).length;
    const remainingInstallments = n - paidInstallments;
    const totalPaid = paidInstallments * installmentAmount;
    const remainingAmount = remainingInstallments * installmentAmount;
    const totalPenaltiesAccrued = Number(installmentsData
        .filter((i) => !i.isPaid && (i.daysLate ?? 0) > 0)
        .reduce((s, i) => s + (i.lateFeeApplied ?? 0) + (i.lateInterestApplied ?? 0), 0)
        .toFixed(2));
    return {
        id: f.id,
        title: f.title,
        userId: f.userId,
        isActive: f.isActive,
        amount: principal,
        installmentAmount,
        interestRate,
        installments: n,
        startDate: f.startDate,
        lateFeeRate,
        lateInterestRate,
        installmentsData,
        totalPaid: Number(totalPaid.toFixed(2)),
        remainingAmount: Number(remainingAmount.toFixed(2)),
        paidInstallments,
        remainingInstallments,
        totalPenaltiesAccrued,
    };
}
function isOverdue(installment) {
    return !installment.isPaid && installment.dueDate < new Date();
}
// ─── Service
export async function createFinancing(input) {
    const financing = await prisma.financing.create({
        data: {
            id: input.id,
            title: input.title || "",
            userId: input.userId,
            amount: new Prisma.Decimal(input.amount),
            installmentAmount: new Prisma.Decimal(input.installmentAmount),
            interestRate: input.interestRate != null
                ? new Prisma.Decimal(input.interestRate)
                : null,
            installments: input.installments,
            startDate: input.startDate,
            lateFeeRate: input.lateFeeRate != null
                ? new Prisma.Decimal(input.lateFeeRate)
                : null,
            lateInterestRate: input.lateInterestRate != null
                ? new Prisma.Decimal(input.lateInterestRate)
                : null,
        },
        include: { installmentsPaid: true },
    });
    return buildFinancingWithInstallments(financing);
}
export async function getFinancings(userId, filter = "all") {
    const financings = await prisma.financing.findMany({
        where: { userId, isActive: true },
        include: { installmentsPaid: true },
        orderBy: { startDate: "asc" },
    });
    const enriched = financings.map(buildFinancingWithInstallments);
    const filtered = enriched.filter((f) => {
        const isFullyPaid = f.remainingInstallments === 0;
        const hasOverdue = f.installmentsData.some(isOverdue);
        if (filter === "paid")
            return isFullyPaid;
        if (filter === "unpaid")
            return !isFullyPaid;
        if (filter === "overdue")
            return hasOverdue;
        return true;
    });
    const summary = {
        count: filtered.length,
        totalAmount: Number(filtered.reduce((s, f) => s + f.amount, 0).toFixed(2)),
        totalPayable: Number(filtered
            .reduce((s, f) => s + f.totalPaid + f.remainingAmount, 0)
            .toFixed(2)),
        totalPaid: Number(filtered.reduce((s, f) => s + f.totalPaid, 0).toFixed(2)),
        totalRemaining: Number(filtered.reduce((s, f) => s + f.remainingAmount, 0).toFixed(2)),
        totalPenaltiesAccrued: Number(filtered.reduce((s, f) => s + f.totalPenaltiesAccrued, 0).toFixed(2)),
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
    return buildFinancingWithInstallments(f);
}
export async function updateFinancing(userId, financingId, input) {
    const existing = await prisma.financing.findFirst({
        where: { id: financingId, userId },
        include: { installmentsPaid: true },
    });
    if (!existing)
        throw new Error("Financing not found");
    if (input.installments !== undefined &&
        input.installments < existing.installmentsPaid.length) {
        throw new Error(`Cannot set installments below ${existing.installmentsPaid.length} (already paid)`);
    }
    const data = {};
    if (input.title !== undefined)
        data.title = input.title;
    if (input.amount !== undefined)
        data.amount = new Prisma.Decimal(input.amount);
    if (input.installmentAmount !== undefined)
        data.installmentAmount = new Prisma.Decimal(input.installmentAmount);
    if (input.interestRate !== undefined)
        data.interestRate =
            input.interestRate != null
                ? new Prisma.Decimal(input.interestRate)
                : null;
    if (input.installments !== undefined)
        data.installments = input.installments;
    if (input.startDate !== undefined)
        data.startDate = input.startDate;
    if (input.lateFeeRate !== undefined)
        data.lateFeeRate =
            input.lateFeeRate != null ? new Prisma.Decimal(input.lateFeeRate) : null;
    if (input.lateInterestRate !== undefined)
        data.lateInterestRate =
            input.lateInterestRate != null
                ? new Prisma.Decimal(input.lateInterestRate)
                : null;
    const updated = await prisma.financing.update({
        where: { id: financingId },
        data,
        include: { installmentsPaid: true },
    });
    return buildFinancingWithInstallments(updated);
}
/**
 * Marca múltiplas parcelas como pagas de uma vez.
 */
export async function markInstallmentsPaid(userId, input) {
    const financing = await prisma.financing.findFirst({
        where: { id: input.financingId, userId },
        include: { installmentsPaid: true },
    });
    if (!financing)
        throw new Error("Financing not found");
    const alreadyPaid = new Set(financing.installmentsPaid.map((i) => i.installmentNumber));
    const installmentAmount = Number(financing.installmentAmount);
    const toCreate = input.installmentNumbers
        .filter((n) => n >= 1 && n <= financing.installments && !alreadyPaid.has(n))
        .map((n) => ({
        financingId: financing.id,
        installmentNumber: n,
        amount: new Prisma.Decimal(installmentAmount.toFixed(2)),
        paidAt: input.paidAt ?? new Date(),
    }));
    if (toCreate.length > 0) {
        await prisma.installmentsPaid.createMany({ data: toCreate });
    }
    const totalPaidAfter = await prisma.installmentsPaid.count({
        where: { financingId: financing.id },
    });
    if (totalPaidAfter >= financing.installments) {
        await prisma.financing.update({
            where: { id: financing.id },
            data: { isActive: false },
        });
    }
    const refreshed = await getFinancingById(userId, financing.id);
    return refreshed;
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