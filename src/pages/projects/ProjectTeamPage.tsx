import AddMemberModal from "@/components/team/AddMemberModal";
import TeamCard from "@/components/team/TeamCard";
import { getTeam } from "@/services/teamService";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"

const ProjectTeamPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  // Query to get all members in the project
  const { data, isLoading, isError } = useQuery({
    queryKey: ['members', projectId],
    queryFn: () => getTeam(projectId),
    retry: false,
    refetchOnWindowFocus: false
  });

  if (isLoading) return <p>Cargando...</p>
  if (isError) return <Navigate to="/404" />
  if (data) return (
    <>
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-3xl font-black text-gray-800 md:text-5xl">Administrar Equipo</h1>
        <p className="text-gray-600">Administra el equipo de trabajo para este proyecto</p>
      </div>

      <nav className="flex flex-col mb-12 md:flex-row gap-2">
        <button
          onClick={() => navigate('?addMember=true')}
          className="px-4 py-2 text-center text-white bg-primary hover:bg-primaryHover">
          Agregar Colaborador
        </button>

        <Link
          to={`/projects/${projectId}`}
          className="px-4 py-2 text-center text-white bg-fuchsia-600 hover:bg-fuchsia-700">
          Volver a proyecto
        </Link>
      </nav>

      {
        data.length === 0
          ? <p>No hay colaboradores en este proyecto</p>
          : <ul role="list"
            className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
            {
              data.map((member) => (
                <TeamCard
                  key={member._id}
                  member={member} />
              ))
            }
          </ul>

      }

      <AddMemberModal />
    </>
  )
}

export default ProjectTeamPage