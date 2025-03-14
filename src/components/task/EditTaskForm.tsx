import { useForm } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';
import { taskEditSchema, TEditTask } from '@/types/taskType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTask, updateTask } from '@/services/taskService';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditTaskForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('editTask')!;

  const queryClient = useQueryClient();

  // Query to get task by id
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getTask({ projectId, taskId }),
    queryKey: ['task', taskId],
    retry: false,
    enabled: !!taskId
  });

  const { register, handleSubmit, formState: { errors } } = useForm<TEditTask>({
    resolver: zodResolver(taskEditSchema)
  });

  // Mutate to update a task
  const { mutate } = useMutation({
    mutationFn: updateTask,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success(message);
      navigate(location.pathname, { replace: true });
    }
  })

  const onSubmit = handleSubmit((formData: TEditTask) => mutate({ projectId, taskId, formData }))

  if (isLoading) return <p>Cargando...</p>
  if (isError) return <Navigate to="/404" />
  if (data) return (
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
          defaultValue={data.name}
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
          defaultValue={data.description}
          className="w-full p-2 border-1 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </textarea>

        {errors.description && <ErrorMessage message={errors.description.message} />}
      </div>

      <input
        type="submit"
        value="Guardar Cambios"
        className="w-full p-2 font-bold bg-primary text-white cursor-pointer hover:bg-secondary" />
    </form>
  )
}

export default EditTaskForm