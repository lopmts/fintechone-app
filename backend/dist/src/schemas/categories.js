import { z } from "zod/v4";
import { categoryKeySchema } from "./shared";
export const createCategorySchema = z.object({
    id: z.string().uuid().optional(),
    key: categoryKeySchema,
    name: z.string().min(1, "Nome da categoria é obrigatório"),
    icon: z.string().optional(),
    color: z.string().optional(),
    type: z.enum(["EXPENSE", "INCOME", "TRANSFER"]),
});
export const updateCategorySchema = createCategorySchema.partial();
export const listCategoriesSchema = z.object({
    updatedSince: z.string().datetime().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(100),
});
//# sourceMappingURL=categories.js.map