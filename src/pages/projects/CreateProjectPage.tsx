import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectCreateShema, TCreateProject } from "@/types/projectType"
import CrearProjectForm from "@/components/projects/CrearProjectForm"
import { useMutation } from "@tanstack/react-query"
import { createProject } from "@/services/projectService"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<TCreateProject>({
    resolver: zodResolver(projectCreateShema),
  });

  // Mutate to create a project
  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
    onSuccess: (message) => {
      toast.success(message);
      navigate('/');
    },
  })

  const onSubmit = handleSubmit((data: TCreateProject) => mutate(data))

  return (
    <>
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-3xl font-black text-gray-800 md:text-5xl">Proyectos</h1>
        <p className="text-gray-600">Define los detalles clave y empieza a trabajar con tu equipo.</p>
      </div>

      <nav className="mb-12">
        <Link
          to="/"
          className="mb-12 px-4 py-2 text-white bg-primary hover:bg-primaryHover">
          Volver a Dashboard
        </Link>
      </nav>

      <form
        onSubmit={onSubmit}
        autoComplete="off"
        noValidate
        className="w-full max-w-[500px] mx-auto p-4 flex flex-col gap-4 bg-white shadow-2xl rounded-md md:p-8">

        <CrearProjectForm
          register={register}
          errors={errors}
        />

        <input
          type="submit"
          value="Crear Proyecto"
          className="w-full p-2 font-bold bg-primary text-white cursor-pointer hover:bg-primaryHover" />
      </form>
    </>
  )
}

export default CreateProjectPage