import { z } from "zod";
export declare const registerSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const userUpdate: z.ZodObject<{
    name: z.ZodString;
    imageUrl: z.ZodOptional<z.ZodURL>;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const verifyCodeSchema: z.ZodObject<{
    email: z.ZodString;
    code: z.ZodString;
}, z.core.$strip>;
export declare const createAccountSchema: z.ZodObject<{
    name: z.ZodString;
    initialBalance: z.ZodDefault<z.ZodNumber>;
    salary: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodEnum<{
        CHECKING: "CHECKING";
        SAVINGS: "SAVINGS";
        CREDIT: "CREDIT";
    }>>;
}, z.core.$strip>;
export declare const updateAccountSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    initialBalance: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    salary: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    type: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        CHECKING: "CHECKING";
        SAVINGS: "SAVINGS";
        CREDIT: "CREDIT";
    }>>>;
}, z.core.$strip>;
export declare const createCategorySchema: z.ZodObject<{
    name: z.ZodString;
    icon: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const createTransactionSchema: z.ZodObject<{
    accountId: z.ZodString;
    categoryId: z.ZodOptional<z.ZodString>;
    description: z.ZodString;
    amount: z.ZodNumber;
    type: z.ZodEnum<{
        EXPENSE: "EXPENSE";
        INCOME: "INCOME";
    }>;
    date: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateTransactionSchema: z.ZodObject<{
    accountId: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    description: z.ZodOptional<z.ZodString>;
    amount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodEnum<{
        EXPENSE: "EXPENSE";
        INCOME: "INCOME";
    }>>;
    date: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const listTransactionsSchema: z.ZodObject<{
    accountId: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        EXPENSE: "EXPENSE";
        INCOME: "INCOME";
    }>>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const createBudgetSchema: z.ZodObject<{
    name: z.ZodString;
    categoryId: z.ZodOptional<z.ZodString>;
    amount: z.ZodNumber;
    period: z.ZodEnum<{
        WEEKLY: "WEEKLY";
        MONTHLY: "MONTHLY";
    }>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    isActive: z.ZodBoolean;
}, z.core.$strip>;
export declare const updateBudgetSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    amount: z.ZodOptional<z.ZodNumber>;
    period: z.ZodOptional<z.ZodEnum<{
        WEEKLY: "WEEKLY";
        MONTHLY: "MONTHLY";
    }>>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const summaryQuerySchema: z.ZodObject<{
    accountId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type VerifyCodeInput = z.infer<typeof verifyCodeSchema>;
export type CreateAccountInput = z.infer<typeof createAccountSchema>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type CreateBudgetInput = z.infer<typeof createBudgetSchema>;
export type ListTransactionsInput = z.infer<typeof listTransactionsSchema>;
//# sourceMappingURL=index.d.ts.map