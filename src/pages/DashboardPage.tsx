import ProjectCard from "@/components/projects/ProjectCard"
import { getProjects } from "@/services/projectService"
import { TProject } from "@/types/projectType"
import { useQuery } from "@tanstack/react-query"
import { Link, Navigate } from "react-router-dom"

const DashboardPage = () => {

  // Query to get the projects
  const { data, isLoading, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
    retry: false,
  })

  if (isLoading) return <p>Cargando...</p>
  if (isError) return <Navigate to="/404" />
  if (data) return (
    <>
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-3xl font-black text-gray-800 md:text-5xl">Crea un Proyecto</h1>
        <p className="text-gray-600">Accede, gestiona y colabora en todos tus proyectos fácilmente.</p>
      </div>

      <nav className="mb-12">
        <Link
          to="/projects/create"
          className="mb-12 px-4 py-2 text-white bg-primary hover:bg-primaryHover">
          Crear Proyecto
        </Link>
      </nav>

      {
        data?.length === 0
          ? <Link
            to="/projects/create"
            className="text-center block">
            No hay proyecto aún, <span className="font-bold text-primary">Crear Proyecto</span>
          </Link>
          : <ul
            role="list"
            className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
            {
              data.map((project: TProject) => (
                <ProjectCard
                  key={project._id}
                  project={project} />
              ))
            }
          </ul>
      }
    </>
  )
}

export default DashboardPage