import { z } from "zod"

export const projectShema = z.object({
  projectName: z.string().min(1, "El nombre del proyecto es requerido"),
  clientName: z.string().min(1, "El nombre del cliente es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
})

export const apiResponseMessage = z.object({ message: z.string() })

export type TCreateProject = z.infer<typeof projectShema>

export type TApiResponseMessage = z.infer<typeof apiResponseMessage>
