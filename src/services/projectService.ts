import api from "@/config/axios";
import { TApiResponseMessage, TCreateProject } from "@/types/projectType";
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