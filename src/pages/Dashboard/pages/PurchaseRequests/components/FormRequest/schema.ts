import { z } from "zod";

export const purchaseFormSchema = z.object({
  solicitante: z.string(),
  datanecessaria: z
    .string({ required_error: "Insira a data da necessidade" })
    .max(10, "Data inválida"),
});

export type TPurchase = z.infer<typeof purchaseFormSchema>;
