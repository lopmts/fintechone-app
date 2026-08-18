import { z } from "zod/v4";
import { categoryKeySchema, categoryRefine, categoryRefineOptions, } from "./shared";
const baseBudgetSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, "Nome do orçamento é obrigatório"),
    categoryId: z.string().optional(),
    categoryKey: categoryKeySchema.optional(),
    amount: z
        .number()
        .int("Valor deve ser em centavos")
        .positive("Limite deve ser positivo"),
    period: z.enum(["WEEKLY", "MONTHLY"]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    isActive: z.boolean(),
});
export const createBudgetSchema = baseBudgetSchema.refine(categoryRefine, categoryRefineOptions);
export const updateBudgetSchema = baseBudgetSchema
    .partial()
    .refine(categoryRefine, categoryRefineOptions);
//# sourceMappingURL=budgets.js.map