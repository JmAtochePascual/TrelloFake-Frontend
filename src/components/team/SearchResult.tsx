import { addMemberToTeam } from "@/services/teamService"
import { TProject } from "@/types/projectType"
import { TTeamMember } from "@/types/teamType"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"

type SearchResultProps = {
  user: TTeamMember,
  projectId: TProject['_id'],
  resetForm: () => void
}

const SearchResult = ({ user, projectId, resetForm }: SearchResultProps) => {


  // Muttate to add a member to the project
  const { mutate } = useMutation({
    mutationFn: addMemberToTeam,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
    onSuccess: (message) => {
      toast.success(message);
      resetForm();
    }
  });

  const handleAddMemberToTeam = () => mutate({ projectId, id: user._id });

  return (
    <div>
      <p className="text-lg font-bold text-center text-gray-700">Resultado:</p>

      <div className="flex justify-between items-center gap-2">
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-600">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>

        <button
          onClick={handleAddMemberToTeam}
          className="w-auto p-2 font-bold text-fuchsia-600 rounded-md cursor-pointer hover:bg-fuchsia-100">
          Agregar al Proyecto
        </button>
      </div>
    </div>
  )
}

export default SearchResult