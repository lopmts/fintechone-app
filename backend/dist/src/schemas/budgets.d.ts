import { z } from "zod/v4";
export declare const createBudgetSchema: z.ZodObject<{
    name: z.ZodString;
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
    amount: z.ZodOptional<z.ZodNumber>;
    period: z.ZodOptional<z.ZodEnum<{
        WEEKLY: "WEEKLY";
        MONTHLY: "MONTHLY";
    }>>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
//# sourceMappingURL=budgets.d.ts.map