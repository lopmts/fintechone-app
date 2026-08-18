import { z } from "zod/v4";
export declare const createCategorySchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    key: z.ZodEnum<{
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
    }>;
    name: z.ZodString;
    icon: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<{
        EXPENSE: "EXPENSE";
        INCOME: "INCOME";
        TRANSFER: "TRANSFER";
    }>;
}, z.core.$strip>;
export declare const updateCategorySchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    key: z.ZodOptional<z.ZodEnum<{
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
    name: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    color: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    type: z.ZodOptional<z.ZodEnum<{
        EXPENSE: "EXPENSE";
        INCOME: "INCOME";
        TRANSFER: "TRANSFER";
    }>>;
}, z.core.$strip>;
export declare const listCategoriesSchema: z.ZodObject<{
    updatedSince: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
//# sourceMappingURL=categories.d.ts.map