import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({required_error: "Username es requerido"}).min(3, {message: "username minimo 3 caracteres "}),
  email: z.string({required_error: "Email is requerido",}).email({message: "Email no es valido",}),
  password: z.string({required_error: "Password is requerido",}).min(7,{message: "Password minimo 7 caracteres",}),
});

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});