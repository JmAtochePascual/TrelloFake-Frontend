import api from "@/config/axios";
import { TApiResponseMessage, TProject } from "@/types/projectType";
import { TTeamMember, TTeamMemberCreate } from "@/types/teamType";
import { isAxiosError } from "axios";

export type TTeamProps = {
  formData: TTeamMemberCreate,
  projectId: TProject['_id'],
  id: TTeamMember['_id'],
  memberId: TTeamMember['_id'],
}

// Search a member by email
export const findMenberByEmail = async ({ formData, projectId }: Pick<TTeamProps, 'formData' | 'projectId'>) => {
  try {
    const { data } = await api.post<TTeamMember>(`/projects/${projectId}/team/find`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar encontrar el usuario');
  }
};


// Add member to team
export const addMemberToTeam = async ({ projectId, id }: Pick<TTeamProps, 'projectId' | 'id'>) => {
  try {
    const { data } = await api.post<TApiResponseMessage>(`/projects/${projectId}/team`, { id });
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar agregar el usuario al proyecto');
  }
};

// Get all members in the project
export const getTeam = async (projectId: TProject['_id']) => {
  try {
    const { data } = await api.get<TTeamMember[]>(`/projects/${projectId}/team`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar obtener los miembros del proyecto');
  }
};

// Delete member from team
export const removeMemberFromTeam = async ({ projectId, memberId }: Pick<TTeamProps, 'projectId' | 'memberId'>) => {
  try {
    const { data } = await api.delete<TApiResponseMessage>(`/projects/${projectId}/team/${memberId}`);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar eliminar el usuario del proyecto');
  }
};