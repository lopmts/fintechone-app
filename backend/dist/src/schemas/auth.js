import { z } from "zod/v4";
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
    email: z.string().email("E-mail inválido"),
});
export const loginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(1).optional(),
});
export const verifyCodeSchema = z.object({
    email: z.string().email("E-mail inválido"),
    code: z.string().length(6, "O código deve ter exatamente 6 dígitos"),
});
//# sourceMappingURL=auth.js.map