import { TTeamMember } from "@/types/teamType"

type SearchResultProps = {
  user: TTeamMember
}

const SearchResult = ({ user }: SearchResultProps) => {
  return (
    <>
      <p className="text-lg font-bold text-center text-primary">Resultado:</p>

      <div className="flex justify-between items-center gap-2">
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-600">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>

        <button
          className="w-auto p-2 font-bold text-fuchsia-600 rounded-md cursor-pointer hover:bg-fuchsia-100">
          Agregar al Proyecto
        </button>
      </div>
    </>
  )
}

export default SearchResult