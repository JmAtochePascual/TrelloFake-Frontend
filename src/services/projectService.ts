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

type TProjectService = {
  projectId: TProject['_id'];
  formData: TCreateProject;
}

// Create a project
export const createProject = async (formData: TProjectService['formData']) => {
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
export const getProject = async (projectId: TProjectService['projectId']) => {
  try {
    const { data } = await api.get<TProject>(`/projects/${projectId}`);
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
export const updateProject = async ({ projectId, formData }: TProjectService) => {
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

// Delete project
export const deleteProject = async (projectId: TProjectService['projectId']) => {
  try {
    const { data } = await api.delete<TApiResponseMessage>(`/projects/${projectId}`);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar eliminar el proyecto');
  }
};