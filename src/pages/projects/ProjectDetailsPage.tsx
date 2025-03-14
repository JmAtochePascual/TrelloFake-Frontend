import TaskList from "@/components/task/TaskList";
import TaskModal from "@/components/task/TaskModal";
import { getProject } from "@/services/projectService";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const ProjectDetailsPage = () => {
  const params = useParams();
  const projectId = params.projectId!;
  const navigate = useNavigate();

  // Query to get the project with the given id
  const { data, isLoading, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProject(projectId),
    retry: false,
  });

  if (isLoading) return <p>Cargando...</p>
  if (isError) return <Navigate to="/" />
  if (data) return (
    <>
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-3xl font-black text-gray-800 md:text-5xl">{data.projectName}</h1>
        <p className="text-gray-600">{data.description}</p>
      </div>

      <button
        onClick={() => navigate('?newtask=true')}
        className="mb-12 px-4 py-2 text-white bg-primary hover:bg-secondary">
        Crear Tarea
      </button>

      <TaskList
        tasks={data.tasks} />

      <TaskModal />
    </>

  )
}

export default ProjectDetailsPage