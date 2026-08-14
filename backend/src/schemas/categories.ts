import { z } from "zod/v4";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Nome da categoria é obrigatório"),
  icon: z.string().optional(),
  color: z.string().optional(),
});
