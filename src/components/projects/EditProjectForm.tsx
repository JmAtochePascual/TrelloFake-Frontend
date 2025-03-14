import { TCreateProject } from "@/types/projectType"
import ErrorMessage from "../ErrorMessage"
import { FieldErrors, UseFormRegister } from "react-hook-form"

type EditProjectFormProps = {
  register: UseFormRegister<TCreateProject>
  errors: FieldErrors<TCreateProject>
  data: TCreateProject
}

const EditProjectForm = ({ register, errors, data }: EditProjectFormProps) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="projectName"
          className="font-bold text-gray-600">
          Nombre del Proyecto
        </label>

        <input
          id="projectName"
          type="text"
          placeholder="Nombre del Proyecto"
          defaultValue={data.projectName}
          {...register("projectName")}
          className="w-full p-2 border-1 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />

        {errors.projectName && <ErrorMessage message={errors.projectName.message} />}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="clientName"
          className="font-bold text-gray-600">
          Nombre del Cliente
        </label>

        <input
          id="clientName"
          type="text"
          placeholder="Nombre del Proyecto"
          defaultValue={data.clientName}
          {...register("clientName")}
          className="w-full p-2 border-1 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />

        {errors.clientName && <ErrorMessage message={errors.clientName.message} />}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="font-bold text-gray-600">
          Descripción
        </label>

        <textarea
          id="description"
          rows={3}
          placeholder="Descripción del Proyecto"
          defaultValue={data.description}
          {...register("description")}
          className="w-full p-2 border-1 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </textarea>

        {errors.description && <ErrorMessage message={errors.description.message} />}
      </div>
    </>
  )
}

export default EditProjectForm