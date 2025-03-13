import api from "@/config/axios";
import { projectsSchema, TApiResponseMessage, TCreateProject, TProjects } from "@/types/projectType";
import { isAxiosError } from "axios";


// Create a project
export const createProject = async (formData: TCreateProject) => {
  try {
    const { data } = await api.post<TApiResponseMessage>('/projects', formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar crear el proyecto');
  }
};

// Get all projects
export const getProjects = async () => {
  try {
    const { data } = await api.get<TProjects>('/projects');

    const response = projectsSchema.safeParse(data);
    if (response.success) return response.data;

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar obtener los proyectos');
  }
};