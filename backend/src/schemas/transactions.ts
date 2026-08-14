import { z } from "zod/v4";
import {
  categoryKeySchema,
  categoryRefine,
  categoryRefineOptions,
} from "./shared";

const baseTransactionSchema = z.object({
  accountId: z.string().min(1, "ID da conta é obrigatório"),
  categoryId: z.string().optional(),
  categoryKey: categoryKeySchema.optional(),
  description: z.string().min(1, "Descrição é obrigatória"),
  amount: z.number().positive("Valor deve ser positivo"),
  type: z.enum(["EXPENSE", "INCOME"]),
  date: z.string().datetime().optional(),
});

export const createTransactionSchema = baseTransactionSchema.refine(
  categoryRefine,
  categoryRefineOptions,
);

export const updateTransactionSchema = baseTransactionSchema
  .partial()
  .refine(categoryRefine, categoryRefineOptions);

export const listTransactionsSchema = z.object({
  accountId: z.string().optional(),
  categoryId: z.string().optional(),
  categoryKey: categoryKeySchema.optional(),
  type: z.enum(["EXPENSE", "INCOME"]).optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});
