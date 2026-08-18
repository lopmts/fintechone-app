import { z } from "zod/v4";
export declare const createAccountSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    initialBalance: z.ZodDefault<z.ZodNumber>;
    salary: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    type: z.ZodDefault<z.ZodEnum<{
        CHECKING: "CHECKING";
        SAVINGS: "SAVINGS";
        CREDIT: "CREDIT";
        MAIN: "MAIN";
    }>>;
    bank: z.ZodDefault<z.ZodEnum<{
        NUBANK: "NUBANK";
        ITAÚ: "ITAÚ";
        BRADESCO: "BRADESCO";
        SANTANDER: "SANTANDER";
        CAIXA: "CAIXA";
        BANCO_DO_BRASIL: "BANCO_DO_BRASIL";
        INTER: "INTER";
        C6_BANK: "C6_BANK";
        PAGBANK: "PAGBANK";
        NEXT: "NEXT";
        ORIGINAL: "ORIGINAL";
        OTHER: "OTHER";
    }>>;
}, z.core.$strip>;
export declare const updateAccountSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    name: z.ZodOptional<z.ZodString>;
    initialBalance: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    salary: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
    type: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        CHECKING: "CHECKING";
        SAVINGS: "SAVINGS";
        CREDIT: "CREDIT";
        MAIN: "MAIN";
    }>>>;
    bank: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        NUBANK: "NUBANK";
        ITAÚ: "ITAÚ";
        BRADESCO: "BRADESCO";
        SANTANDER: "SANTANDER";
        CAIXA: "CAIXA";
        BANCO_DO_BRASIL: "BANCO_DO_BRASIL";
        INTER: "INTER";
        C6_BANK: "C6_BANK";
        PAGBANK: "PAGBANK";
        NEXT: "NEXT";
        ORIGINAL: "ORIGINAL";
        OTHER: "OTHER";
    }>>>;
}, z.core.$strip>;
//# sourceMappingURL=accounts.d.ts.map