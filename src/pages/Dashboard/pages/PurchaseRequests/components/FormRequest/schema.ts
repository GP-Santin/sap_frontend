import { z } from "zod";

export const purchaseFormSchema = z.object({
  RequriedDate: z.string({ required_error: "Insira a data" }),
  U_SNT_Requester: z.string(),
  ItemCode: z.string({ required_error: "Insira o item" }),
  ItemDescription: z.string({ required_error: "Selecione um item" }),
  Quantity: z.string().min(1, "Insira a quantidade"),
  CostingCode2: z.string().min(1, "Selecione uma gerencial"),
  CostingCode: z.string().min(1, "Selecione uma corporativo"),
  ProjectCode: z.string().min(1, "Selecione um projeto"),
  Comments: z.string(),
});

export interface TPurchase extends z.infer<typeof purchaseFormSchema> {}
