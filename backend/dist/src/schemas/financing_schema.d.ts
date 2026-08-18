import z from "zod";
export declare const optionalPercent: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
export declare const createFinancingSchema: {
    body: z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        amount: z.ZodNumber;
        installmentAmount: z.ZodNumber;
        interestRate: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        installments: z.ZodNumber;
        startDate: z.ZodString;
        lateFeeRate: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        lateInterestRate: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, z.core.$strip>;
};
export declare const listFinancingsSchema: {
    querystring: z.ZodObject<{
        filter: z.ZodOptional<z.ZodEnum<{
            all: "all";
            paid: "paid";
            unpaid: "unpaid";
            overdue: "overdue";
        }>>;
    }, z.core.$strip>;
};
export declare const getFinancingSchema: {
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
};
export declare const updateFinancingSchema: {
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        amount: z.ZodOptional<z.ZodNumber>;
        installmentAmount: z.ZodOptional<z.ZodNumber>;
        interestRate: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        installments: z.ZodOptional<z.ZodNumber>;
        startDate: z.ZodOptional<z.ZodString>;
        lateFeeRate: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        lateInterestRate: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, z.core.$strip>;
};
export declare const markPaidSchema: {
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        installmentNumbers: z.ZodArray<z.ZodNumber>;
        paidAt: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
};
export declare const deleteFinancingSchema: {
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
};
//# sourceMappingURL=financing_schema.d.ts.map