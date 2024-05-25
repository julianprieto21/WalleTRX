import { z } from "zod";

export const TransactionSchema = z.object({
  type: z.enum(["income", "expense", "transfer"]),
  description: z.string(),
  account: z.string(),
  account_2: z.union([z.string(), z.null()]),
  category: z.string(),
  amount: z.string().transform((value) => parseFloat(value)),
  created_at: z.string(),
});

export const AccountSchema = z.object({
  name: z.string(),
  currency: z.string(),
  type: z.string(),
  color: z.string(),
});
