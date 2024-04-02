import { z } from "zod";

const loginFormSchema = z.object({
  CompanyDB: z.string().email("O e-mail fornecido é inválido."),
  UserName: z.string(),
  Password: z
    .string()
    .min(4, "A senha deve ter no mínimo 4 caracteres.")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número."),
});

export type TLoginForm = z.infer<typeof loginFormSchema>;
