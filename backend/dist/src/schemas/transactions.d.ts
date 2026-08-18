import { z } from "zod/v4";
export declare const createTransactionSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    accountId: z.ZodString;
    categoryId: z.ZodOptional<z.ZodString>;
    categoryKey: z.ZodOptional<z.ZodEnum<{
        readonly FOOD: "FOOD";
        readonly TRANSPORT: "TRANSPORT";
        readonly HOUSING: "HOUSING";
        readonly HEALTH: "HEALTH";
        readonly LEISURE: "LEISURE";
        readonly EDUCATION: "EDUCATION";
        readonly CLOTHING: "CLOTHING";
        readonly SALARY: "SALARY";
        readonly FREELANCE: "FREELANCE";
        readonly INVESTMENT: "INVESTMENT";
        readonly CARD: "CARD";
        readonly OTHER: "OTHER";
    }>>;
    description: z.ZodString;
    amount: z.ZodNumber;
    type: z.ZodEnum<{
        EXPENSE: "EXPENSE";
        INCOME: "INCOME";
        TRANSFER: "TRANSFER";
    }>;
    date: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateTransactionSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    accountId: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    categoryKey: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        readonly FOOD: "FOOD";
        readonly TRANSPORT: "TRANSPORT";
        readonly HOUSING: "HOUSING";
        readonly HEALTH: "HEALTH";
        readonly LEISURE: "LEISURE";
        readonly EDUCATION: "EDUCATION";
        readonly CLOTHING: "CLOTHING";
        readonly SALARY: "SALARY";
        readonly FREELANCE: "FREELANCE";
        readonly INVESTMENT: "INVESTMENT";
        readonly CARD: "CARD";
        readonly OTHER: "OTHER";
    }>>>;
    description: z.ZodOptional<z.ZodString>;
    amount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodEnum<{
        EXPENSE: "EXPENSE";
        INCOME: "INCOME";
        TRANSFER: "TRANSFER";
    }>>;
    date: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const listTransactionsSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    accountId: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    categoryKey: z.ZodOptional<z.ZodEnum<{
        readonly FOOD: "FOOD";
        readonly TRANSPORT: "TRANSPORT";
        readonly HOUSING: "HOUSING";
        readonly HEALTH: "HEALTH";
        readonly LEISURE: "LEISURE";
        readonly EDUCATION: "EDUCATION";
        readonly CLOTHING: "CLOTHING";
        readonly SALARY: "SALARY";
        readonly FREELANCE: "FREELANCE";
        readonly INVESTMENT: "INVESTMENT";
        readonly CARD: "CARD";
        readonly OTHER: "OTHER";
    }>>;
    type: z.ZodOptional<z.ZodEnum<{
        EXPENSE: "EXPENSE";
        INCOME: "INCOME";
        TRANSFER: "TRANSFER";
    }>>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
    updatedSince: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
//# sourceMappingURL=transactions.d.ts.map