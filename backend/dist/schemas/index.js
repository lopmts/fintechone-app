import { z } from "zod";
// Auth
export const registerSchema = z.object({
    name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z
        .string()
        .min(6, "Senha deve ter ao menos 6 caracteres")
        .optional(),
});
export const userUpdate = z.object({
    name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
    imageUrl: z.url("Image deve ser uma url valida!").optional(),
});
export const loginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(1).optional(),
});
export const verifyCodeSchema = z.object({
    email: z.string().email("E-mail inválido"),
    code: z.string().length(6, "O código deve ter exatamente 6 dígitos"),
});
// Account
export const createAccountSchema = z.object({
    name: z.string().min(1, "Nome da conta é obrigatório"),
    initialBalance: z.number().default(0),
    salary: z.number().optional(),
    type: z.enum(["CHECKING", "SAVINGS", "CREDIT"]).default("CHECKING"),
});
export const updateAccountSchema = createAccountSchema.partial();
// Category
export const createCategorySchema = z.object({
    name: z.string().min(1, "Nome da categoria é obrigatório"),
    icon: z.string().optional(),
    color: z.string().optional(),
});
// Transaction
export const createTransactionSchema = z.object({
    accountId: z.string().min(1, "ID da conta é obrigatório"),
    categoryId: z.string().optional(),
    description: z.string().min(1, "Descrição é obrigatória"),
    amount: z.number().positive("Valor deve ser positivo"),
    type: z.enum(["EXPENSE", "INCOME"]),
    date: z.string().datetime().optional(),
});
export const updateTransactionSchema = createTransactionSchema.partial();
export const listTransactionsSchema = z.object({
    accountId: z.string().optional(),
    categoryId: z.string().optional(),
    type: z.enum(["EXPENSE", "INCOME"]).optional(),
    from: z.string().datetime().optional(),
    to: z.string().datetime().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
});
// Budget
export const createBudgetSchema = z.object({
    name: z.string().min(1, "Nome do orçamento é obrigatório"),
    categoryId: z.string().cuid().optional(),
    amount: z
        .number()
        .int("Valor deve ser em centavos")
        .positive("Limite deve ser positivo"),
    period: z.enum(["WEEKLY", "MONTHLY"]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    isActive: z.boolean(),
});
export const updateBudgetSchema = createBudgetSchema.partial();
// Summary
export const summaryQuerySchema = z.object({
    accountId: z.string().optional(),
});
//# sourceMappingURL=index.js.map