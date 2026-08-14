import { z } from "zod/v4";
import { CategoryKey } from "../generated/prisma/enums";

export const categoryKeySchema = z.enum(CategoryKey);

export const categoryRefine = (data: {
  categoryId?: string;
  categoryKey?: CategoryKey;
}) => !(data.categoryId && data.categoryKey);

export const categoryRefineOptions = {
  message: "Informe apenas categoryId ou categoryKey, não ambos",
  path: ["categoryId"],
};
