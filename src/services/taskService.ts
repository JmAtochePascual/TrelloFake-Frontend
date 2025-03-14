import api from "@/config/axios";
import { TApiResponseMessage, TProject } from "@/types/projectType";
import { TCreateTask } from "@/types/taskType";
import { isAxiosError } from "axios";

type TaskService = {
  projectId: TProject['_id'],
  formData: TCreateTask,
}

// Create a task
export const createTask = async ({ projectId, formData }: TaskService) => {
  try {
    const { data } = await api.post<TApiResponseMessage>(`/projects/${projectId}/tasks`, formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar crear la tarea');
  }
} 