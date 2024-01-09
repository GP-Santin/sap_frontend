import { z } from "zod";

export const purchaseFormSchema = z.object({
  RequriedDate: z.string({ required_error: "Insira a data" }),
  // U_SNT_Requester: z.string().nullable(),
  DocumentLines: z.array(
    z.object({
      ItemCode: z.string({ required_error: "Insira o item" }),
      ItemDescription: z.string({ required_error: "Selecione um item" }),
      Quantity: z.string().min(1, "Insira a quantidade"),
      CostingCode2: z
        .string({ required_error: "Selecione uma gerencial" })
        .min(1, "Selecione uma gerencial"),
      CostingCode: z.string().nullable(),
      ProjectCode: z
        .string({ required_error: "Selecione um projeto" })
        .min(1, "Selecione um projeto"),
    })
  ),
  // Comments: z.string(),
});

export type IPurchaseRequest = z.infer<typeof purchaseFormSchema>;
