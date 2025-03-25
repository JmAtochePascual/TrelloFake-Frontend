import api from '@/config/axios';
import { isAxiosError } from 'axios';
import { NoteCreateType } from '@/types/noteType';
import { TApiResponseMessage, TProject } from '@/types/projectType';
import { TTask } from '@/types/taskType';

type NotePropsType = {
  projectId: TProject['_id'];
  taskId: TTask['_id'];
  formData: NoteCreateType;
};

// Create a note
export const createNote = async ({ projectId, taskId, formData }: Pick<NotePropsType, 'projectId' | 'taskId' | 'formData'>) => {
  try {
    const { data } = await api.post<TApiResponseMessage>(`/projects/${projectId}/tasks/${taskId}/notes`, formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar crear la nota');
  }
};
