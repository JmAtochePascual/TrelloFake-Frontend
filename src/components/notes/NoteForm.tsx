import { useForm } from "react-hook-form";
import { noteCreateSchema, NoteCreateType } from "@/types/noteType";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "@/services/noteService";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

const NoteForm = () => {
  // Project id
  const params = useParams();
  const projectId = params.projectId!;

  // Task id
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('taskDetails')!;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<NoteCreateType>({
    resolver: zodResolver(noteCreateSchema)
  });

  // Mutate to create a note
  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Error al intentar crear la nota')
      }
    },
    onSuccess: (message) => {
      toast.success(message);
      reset();
    }
  })

  const handleAddNote = handleSubmit((formData: NoteCreateType) => mutate({ projectId, taskId, formData }));

  return (
    <form
      onSubmit={handleAddNote}
      autoComplete="off"
      noValidate
      className="w-full flex flex-col gap-4 rounded-md">

      <div className="flex flex-col gap-2">
        <label
          htmlFor="content"
          className="font-bold text-gray-600">
          Crer nota
        </label>

        <input
          id="content"
          type="text"
          placeholder="Contenido de la nota"
          {...register("content")}
          className="w-full p-2 border-1 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />

        {errors.content && <ErrorMessage message={errors.content.message} />}
      </div>


      <input
        type="submit"
        value="Crear Nota"
        className="w-full p-2 font-bold bg-primary text-white cursor-pointer hover:bg-primaryHover" />
    </form>
  )
}

export default NoteForm