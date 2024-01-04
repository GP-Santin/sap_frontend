import { z } from "zod";

export const purchaseFormSchema = z.object({
  solicitante: z.string(),
  fornecedor: z.string().min(5, "Obrigatório preencher o fornecedor"),
  comprador: z.string(),
});

export type TPurchase = z.infer<typeof purchaseFormSchema>;
