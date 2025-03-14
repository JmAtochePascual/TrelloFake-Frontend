import { z } from "zod"

export const projectCreateShema = z.object({
  projectName: z.string().min(1, "El nombre del proyecto es requerido"),
  clientName: z.string().min(1, "El nombre del cliente es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
});

export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  tasks: z.array(
    z.object({
      _id: z.string(),
      name: z.string(),
      description: z.string(),
      status: z.string(),
      project: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      __v: z.number()
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number()
});

export const projectTaskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.string(),
  project: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number()
});

export const projectTasksSchema = z.array(projectTaskSchema);

export const projectsSchema = z.array(projectSchema);

export const apiResponseMessage = z.object({ message: z.string() });

export type TCreateProject = z.infer<typeof projectCreateShema>;

export type TApiResponseMessage = z.infer<typeof apiResponseMessage>;

export type TProject = z.infer<typeof projectSchema>;

export type TProjects = z.infer<typeof projectsSchema>;

export type TProjectTask = z.infer<typeof projectTaskSchema>;

export type TProjectTasks = z.infer<typeof projectTasksSchema>;


