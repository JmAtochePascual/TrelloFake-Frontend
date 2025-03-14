import { isAxiosError } from "axios";
import api from "@/config/axios";
import {
  projectSchema,
  projectsSchema,
  TApiResponseMessage,
  TCreateProject,
  TProject,
  TProjects
} from "@/types/projectType";


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

// Get a project by ID
export const getProject = async (id: TProject['_id']) => {
  try {
    const { data } = await api.get<TProject>(`/projects/${id}`);
    const response = projectSchema.safeParse(data);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar obtener el proyecto');
  }
};

// Update project
export const updateProject = async ({ projectId, formData }: { projectId: TProject['_id'], formData: TCreateProject }) => {
  try {
    const { data } = await api.put<TApiResponseMessage>(`/projects/${projectId}`, formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar actualizar el proyecto');
  }
};