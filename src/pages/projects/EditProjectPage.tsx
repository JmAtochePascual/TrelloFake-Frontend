import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { getProject, updateProject } from "@/services/projectService";
import { projectCreateShema, TCreateProject } from "@/types/projectType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const EditProjectPage = () => {
  const params = useParams();
  const projectId = params.projectId!;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Query to get the project bu ID
  const { data, isLoading, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProject(projectId),
    retry: false,
  });

  const { register, handleSubmit, formState: { errors } } = useForm<TCreateProject>({
    resolver: zodResolver(projectCreateShema)
  });

  // Mutate to update the project
  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ['project', `${projectId}`] });
      toast.success(message);
      navigate('/');
    },
  })

  const onSubmit = handleSubmit((formData: TCreateProject) => mutate({ projectId, formData }))

  if (isLoading) return <p>Cargando...</p>
  if (isError) return <Navigate to="/" />
  if (data) return (
    <>
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-3xl font-black text-gray-800 md:text-5xl">Editar Proyecto</h1>
        <p className="text-gray-600">Define los detalles clave y empieza a trabajar con tu equipo.</p>
      </div>

      <nav className="mb-12">
        <Link
          to="/"
          className="mb-12 px-4 py-2 text-white bg-primary hover:bg-secondary">
          Volver a Dashboard
        </Link>
      </nav>

      <form
        onSubmit={onSubmit}
        autoComplete="off"
        noValidate
        className="w-full max-w-[500px] mx-auto p-4 flex flex-col gap-4 bg-white shadow-2xl rounded-md md:p-8">

        <EditProjectForm
          register={register}
          errors={errors}
          data={data}
        />

        <input
          type="submit"
          value="Guardar Cambios"
          className="w-full p-2 font-bold bg-primary text-white cursor-pointer hover:bg-secondary" />
      </form>
    </>
  )
}

export default EditProjectPage