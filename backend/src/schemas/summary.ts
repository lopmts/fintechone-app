import { z } from "zod/v4";

export const summaryQuerySchema = z.object({
  accountId: z.string().optional(),
});
