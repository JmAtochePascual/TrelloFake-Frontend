import { z } from "zod";

export const createAccountSchema = z.object({
  name: z.string().min(1, { message: "Debes ingresar un nombre" }),
  email: z.string().email({ message: "Debes ingresar un correo electronico" }),
  password: z.string().min(8, { message: "Debes ingresar una contraseña" }),
  confirmPassword: z.string().min(8, { message: "Debes ingresar una contraseña" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
});

export const resendTokenSchema = z.object({
  email: z.string().email({ message: "Debes ingresar un correo electronico valido" }),
});

export const verifyTokenSchema = z.object({
  token: z.string().min(6, { message: "El token no es válido" }),
});

export const updatePasswordSchema = z.object({
  password: z.string().min(8, { message: "Debes ingresar una contraseña valida" }),
  confirmPassword: z.string().min(8, { message: "Debes ingresar una confirmacion de contraseña valida" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Debes ingresar un correo electronico" }),
  password: z.string().min(8, { message: "Debes ingresar una contraseña valida" }),
});

export const profileSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  confirmed: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number()
});

export const userSchema = z.object({
  name: z.string().min(1, { message: "Debes ingresar un nombre" }),
  email: z.string().email({ message: "Debes ingresar un correo electronico" }),
});

export const passwordSchema = z.object({
  currentPassword: z.string().min(8, { message: "Debes ingresar una contraseña valida" }),
  password: z.string().min(8, { message: "Debes ingresar una contraseña valida" }),
  confirmPassword: z.string().min(8, { message: "Debes ingresar una confirmacion de contraseña valida" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export const checkPasswordSchema = z.object({
  password: z.string().min(1, "La contraseña es requerida"),
});

export type TCreateAccount = z.infer<typeof createAccountSchema>;

export type TConfirmAccount = z.infer<typeof verifyTokenSchema>;

export type TResendToken = z.infer<typeof resendTokenSchema>;

export type TForgotPassword = z.infer<typeof resendTokenSchema>;

export type TVerifyToken = z.infer<typeof verifyTokenSchema>;

export type TUpdatePassword = z.infer<typeof updatePasswordSchema>;

export type TLogin = z.infer<typeof loginSchema>;

export type TProfile = z.infer<typeof profileSchema>;

export type TUser = z.infer<typeof userSchema>;

export type TPassword = z.infer<typeof passwordSchema>;

export type TCheckPassword = z.infer<typeof checkPasswordSchema>;