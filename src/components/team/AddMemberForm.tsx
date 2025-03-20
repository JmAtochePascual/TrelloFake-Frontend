import { teamMemberCreateSchema, TTeamMemberCreate } from '@/types/teamType';
import ErrorMessage from '../ErrorMessage'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { findMenberByEmail } from '@/services/teamService';
import SearchResult from './SearchResult';

const AddMemberForm = () => {
  const params = useParams();
  const projectId = params.projectId!;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<TTeamMemberCreate>({
    resolver: zodResolver(teamMemberCreateSchema)
  });

  // Mutate to find an user 
  const mutation = useMutation({
    mutationFn: findMenberByEmail
  });

  // Reset form
  const resetForm = () => {
    reset();
    mutation.reset();
  };

  const onSubmit = handleSubmit((formData: TTeamMemberCreate) => mutation.mutate({ projectId, formData }));

  return (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
      noValidate
      className="w-full flex flex-col gap-4 rounded-md">

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="font-bold text-gray-600">
          Email del Usuario
        </label>

        <input
          id="email"
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full p-2 border-1 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />

        {errors.email && <ErrorMessage message={errors.email.message} />}
      </div>

      <input
        type="submit"
        value="Buscar Usuario"
        className="w-full p-2 font-bold bg-primary text-white cursor-pointer hover:bg-primaryHover" />

      {mutation.isPending && <p className='text-center text-primary'>Cargando...</p>}

      {mutation.isError && <p className='text-center text-red-500'>{mutation.error.message}</p>}

      {
        mutation.data &&
        <SearchResult
          user={mutation.data}
          projectId={projectId}
          resetForm={resetForm}
        />
      }
    </form>
  )
}

export default AddMemberForm