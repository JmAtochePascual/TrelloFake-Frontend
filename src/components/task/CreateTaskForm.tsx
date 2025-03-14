import { taskCreateSchema, TCreateTask } from '@/types/taskType';
import ErrorMessage from '../ErrorMessage'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createTask } from '@/services/taskService';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const CreateTaskForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { register, handleSubmit, formState: { errors } } = useForm<TCreateTask>({
    resolver: zodResolver(taskCreateSchema)
  });

  // Mutate to create a task
  const { mutate, } = useMutation({
    mutationFn: createTask,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      };
    },
    onSuccess: (message) => {
      toast.success(message);
      navigate(location.pathname, { replace: true });
    },
  });

  const onSubmit = handleSubmit((formData: TCreateTask) => mutate({ projectId, formData }));

  return (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
      noValidate
      className="w-full flex flex-col gap-4 rounded-md">

      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="font-bold text-gray-600">
          Nombre del Cliente
        </label>

        <input
          id="name"
          type="text"
          placeholder="Nombre de la Tarea"
          {...register("name")}
          className="w-full p-2 border-1 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />

        {errors.name && <ErrorMessage message={errors.name.message} />}
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
          placeholder="Descripción"
          {...register("description")}
          className="w-full p-2 border-1 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </textarea>

        {errors.description && <ErrorMessage message={errors.description.message} />}
      </div>

      <input
        type="submit"
        value="Crear Tarea"
        className="w-full p-2 font-bold bg-primary text-white cursor-pointer hover:bg-secondary" />
    </form>
  )
}

export default CreateTaskForm