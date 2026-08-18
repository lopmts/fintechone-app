import z from "zod";
export const optionalPercent = z.number().min(0).nullable().optional();
export const createFinancingSchema = {
    body: z.object({
        id: z.string().uuid().optional(),
        title: z.string().min(1).max(130),
        amount: z.number().min(0.01),
        installmentAmount: z.number().min(0.01),
        interestRate: optionalPercent, // % ao mês — opcional, apenas informativo
        installments: z.number().int().min(1),
        startDate: z.string().datetime(),
        lateFeeRate: optionalPercent, // % multa única sobre a parcela
        lateInterestRate: optionalPercent, // % mora ao dia sobre a parcela
    }),
};
export const listFinancingsSchema = {
    querystring: z.object({
        filter: z.enum(["all", "paid", "unpaid", "overdue"]).optional(),
    }),
};
export const getFinancingSchema = {
    params: z.object({
        id: z.string(),
    }),
};
export const updateFinancingSchema = {
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        title: z.string().min(1).max(130).optional(),
        amount: z.number().min(0.01).optional(),
        installmentAmount: z.number().min(0.01).optional(),
        interestRate: optionalPercent,
        installments: z.number().int().min(1).optional(),
        startDate: z.string().datetime().optional(),
        lateFeeRate: optionalPercent,
        lateInterestRate: optionalPercent,
    }),
};
export const markPaidSchema = {
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        installmentNumbers: z.array(z.number().int().min(1)).min(1),
        paidAt: z.string().datetime().optional(),
    }),
};
export const deleteFinancingSchema = {
    params: z.object({
        id: z.string(),
    }),
};
//# sourceMappingURL=financing_schema.js.map