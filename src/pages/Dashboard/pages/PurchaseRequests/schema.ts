import { z } from "zod";

export const purchaseRequestSchema = z.object({
  DocDueDate: z.date({ required_error: "Insira a data de vencimento" }),
  RequriedDate: z.date({ required_error: "Insira a data da necessidade" }),
  // MainUsage: z.string
});

export type TPurchaseRequest = z.infer<typeof purchaseRequestSchema>;
