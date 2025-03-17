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

export const resendTokenSchema = loginSchema.pick({
  email: true,
});

export const tokenSchema = z.string().min(6, { message: "El token no es válido" });

export type TRegister = z.infer<typeof registerSchema>;

export type TLogin = z.infer<typeof loginSchema>;

export type TResendToken = z.infer<typeof resendTokenSchema>;

export type TToken = z.infer<typeof tokenSchema>;
