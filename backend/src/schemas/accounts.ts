import { z } from "zod/v4";

export const createAccountSchema = z.object({
  name: z.string().min(1, "Nome da conta é obrigatório"),
  initialBalance: z.number().default(0),
  salary: z.number().optional(),
  type: z.enum(["CHECKING", "SAVINGS", "CREDIT"]).default("CHECKING"),
});

export const updateAccountSchema = createAccountSchema.partial();
