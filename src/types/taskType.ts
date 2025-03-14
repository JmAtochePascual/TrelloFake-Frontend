import { z } from "zod"

export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, "El nombre de la tarea es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  status: taskStatusSchema,
  project: z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
    __v: z.number()
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number()
});


export const taskCreateSchema = taskSchema.pick({
  name: true,
  description: true
});

export type TTask = z.infer<typeof taskSchema>;

export type TCreateTask = z.infer<typeof taskCreateSchema>;
