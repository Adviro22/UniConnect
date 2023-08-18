import { z } from "zod";
 
export const createProductSchema = z.object({
  nombre: z.string({required_error: "Nombre is required",}),
  precio: z.number({required_error: "Precio es requerido",})
    .min(1,{message:"La nota debe ser como minimo 1",}),
  stock: z.number({required_error: "Stock es requerido"},)
    .min(1,{message:"La nota debe ser como minimo 1 y maximo 50"},)
});