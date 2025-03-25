import { z } from 'zod'

export const noteCreateSchema = z.object({
  content: z.string().min(1, "El contenido de la nota es requerido"),
});

export const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createBy: z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string()
  }),
  task: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number()
});


export const notesSchema = z.array(noteSchema);

export type NoteCreateType = z.infer<typeof noteCreateSchema>

export type NoteType = z.infer<typeof noteSchema>

export type NotesType = z.infer<typeof notesSchema>

