import api from "@/config/axios";
import { TProject } from "@/types/projectType";
import { TTeamMember, TTeamMemberCreate } from "@/types/teamType";
import { isAxiosError } from "axios";

export type TTeamProps = {
  formData: TTeamMemberCreate,
  projectId: TProject['_id']
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
