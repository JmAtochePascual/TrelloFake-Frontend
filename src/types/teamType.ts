import z from "zod";

export const teamMemberCreateSchema = z.object({
  email: z.string().email({ message: "Debes ingresar un correo electronico valido" }),
});

export const teamMemberSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string()
});

export type TTeamMemberCreate = z.infer<typeof teamMemberCreateSchema>;

export type TTeamMember = z.infer<typeof teamMemberSchema>;

