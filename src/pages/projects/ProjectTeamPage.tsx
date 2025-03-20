import AddMemberModal from "@/components/team/AddMemberModal";
import { Link, useNavigate, useParams } from "react-router-dom"

const ProjectTeamPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  return (
    <>
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-3xl font-black text-gray-800 md:text-5xl">Administrar Equipo</h1>
        <p className="text-gray-600">Administra el equipo de trabajo para este proyecto</p>
      </div>

      <nav className="mb-12 flex gap-2">
        <button
          onClick={() => navigate('?addMember=true')}
          className="px-4 py-2 text-white bg-primary hover:bg-primaryHover">
          Agregar Colaborador
        </button>

        <Link
          to={`/projects/${projectId}`}
          className="px-4 py-2 text-white bg-fuchsia-600 hover:bg-fuchsia-700">
          Volver a proyecto
        </Link>
      </nav>

      <AddMemberModal />
    </>
  )
}

export default ProjectTeamPage