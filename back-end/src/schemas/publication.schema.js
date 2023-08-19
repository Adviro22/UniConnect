import { z } from "zod";
 
export const createProductSchema = z.object({
  title: z.string({required_error: "Titulo is required",}),
  description: z.string({required_error: "Descripcion es requerido",})
    .min(1,{message:"La nota debe ser como minimo 1",}),
  image: z.string()
});