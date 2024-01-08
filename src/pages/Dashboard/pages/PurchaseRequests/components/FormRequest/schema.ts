import { z } from "zod";

export const purchaseFormSchema = z.object({
  RequriedDate: z.string({ required_error: "Insira a data" }),
  U_SNT_Requester: z.string(),
  ItemCode: z.string({ required_error: "Insira o item" }),
  ItemDescription: z.string({ required_error: "Selecione um item" }),
  Quantity: z.string({
    required_error: "Insira a quantidade",
    invalid_type_error: "Insira um número",
  }),
  CostingCode2: z.string({ required_error: "Insira a Gerencial" }),
  CostingCode: z.string({ required_error: "Insira o Custo" }),
  ProjectCode: z.string({ required_error: "Insira o Projeto" }),
});

export type TPurchase = z.infer<typeof purchaseFormSchema>;
