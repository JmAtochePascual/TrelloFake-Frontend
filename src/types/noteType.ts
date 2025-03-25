import { z } from 'zod'

export const noteCreateSchema = z.object({
  content: z.string().min(1, "El contenido de la nota es requerido"),
});

export type NoteCreateType = z.infer<typeof noteCreateSchema>
