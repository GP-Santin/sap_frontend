import { z } from "zod";

export const purchaseFormSchema = z.object({
  solicitante: z.string(),
  datanecessaria: z.string().min(1,"Obrigatório preencher a data necessária")
});

export type TPurchase = z.infer<typeof purchaseFormSchema>;
