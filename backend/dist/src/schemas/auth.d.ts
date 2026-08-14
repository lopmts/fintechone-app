import { z } from "zod/v4";
export declare const registerSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const userUpdate: z.ZodObject<{
    name: z.ZodString;
    imageUrl: z.ZodOptional<z.ZodURL>;
    email: z.ZodString;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const verifyCodeSchema: z.ZodObject<{
    email: z.ZodString;
    code: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=auth.d.ts.map