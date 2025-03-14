import api from "@/config/axios";
import { TApiResponseMessage, TProject } from "@/types/projectType";
import { taskSchema, TCreateTask, TTask } from "@/types/taskType";
import { isAxiosError } from "axios";

type TaskService = {
  projectId: TProject['_id'],
  taskId: TTask['_id']
  formData: TCreateTask,
}

// Create a task
export const createTask = async ({ projectId, formData }: Pick<TaskService, 'projectId' | 'formData'>) => {
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

// Get a task by id
export const getTask = async ({ projectId, taskId }: Pick<TaskService, 'projectId' | 'taskId'>) => {
  try {
    const { data } = await api.get<TTask>(`/projects/${projectId}/tasks/${taskId}`);
    const response = taskSchema.safeParse(data);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar obtener la tarea');
  }
}

// Update a task
export const updateTask = async ({ projectId, taskId, formData }: Pick<TaskService, 'projectId' | 'taskId' | 'formData'>) => {
  try {
    const { data } = await api.put<TApiResponseMessage>(`/projects/${projectId}/tasks/${taskId}`, formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar actualizar la tarea');
  }
}