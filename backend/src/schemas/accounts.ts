import { z } from "zod/v4";

export const createAccountSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Nome da conta é obrigatório"),
  initialBalance: z.number().default(0),
  salary: z.number().nullable().optional(), // ← aceita null, não só omitido
  type: z
    .enum(["CHECKING", "SAVINGS", "CREDIT", "MAIN"]) // ← faltava MAIN
    .default("CHECKING"),
  bank: z // ← campo inteiro que faltava
    .enum([
      "NUBANK",
      "ITAÚ",
      "BRADESCO",
      "SANTANDER",
      "CAIXA",
      "BANCO_DO_BRASIL",
      "INTER",
      "C6_BANK",
      "PAGBANK",
      "NEXT",
      "ORIGINAL",
      "OTHER",
    ])
    .default("OTHER"),
});

export const updateAccountSchema = createAccountSchema.partial();
