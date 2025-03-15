import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Debes ingresar un nombre" }),
  email: z.string().email({ message: "Debes ingresar un correo electronico" }),
  password: z.string().min(8, { message: "Debes ingresar una contraseña" }),
  confirmPassword: z.string().min(8, { message: "Debes ingresar una contraseña" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Debes ingresar un correo electronico" }),
  password: z.string().min(8, { message: "Debes ingresar una contraseña valida" }),
});


export type TRegister = z.infer<typeof registerSchema>;

export type TLogin = z.infer<typeof loginSchema>;
