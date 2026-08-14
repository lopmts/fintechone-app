import { z } from "zod/v4";
export declare const createAccountSchema: z.ZodObject<{
    name: z.ZodString;
    initialBalance: z.ZodDefault<z.ZodNumber>;
    salary: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodEnum<{
        CHECKING: "CHECKING";
        SAVINGS: "SAVINGS";
        CREDIT: "CREDIT";
    }>>;
}, z.core.$strip>;
export declare const updateAccountSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    initialBalance: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    salary: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    type: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        CHECKING: "CHECKING";
        SAVINGS: "SAVINGS";
        CREDIT: "CREDIT";
    }>>>;
}, z.core.$strip>;
//# sourceMappingURL=accounts.d.ts.map