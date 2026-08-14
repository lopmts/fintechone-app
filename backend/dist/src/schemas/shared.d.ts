import { z } from "zod/v4";
import { CategoryKey } from "../generated/prisma/enums";
export declare const categoryKeySchema: z.ZodEnum<{
    readonly FOOD: "FOOD";
    readonly TRANSPORT: "TRANSPORT";
    readonly HOUSING: "HOUSING";
    readonly HEALTH: "HEALTH";
    readonly LEISURE: "LEISURE";
    readonly EDUCATION: "EDUCATION";
    readonly CLOTHING: "CLOTHING";
    readonly SALARY: "SALARY";
    readonly FREELANCE: "FREELANCE";
    readonly INVESTMENT: "INVESTMENT";
    readonly CARD: "CARD";
    readonly OTHER: "OTHER";
}>;
export declare const categoryRefine: (data: {
    categoryId?: string;
    categoryKey?: CategoryKey;
}) => boolean;
export declare const categoryRefineOptions: {
    message: string;
    path: string[];
};
//# sourceMappingURL=shared.d.ts.map