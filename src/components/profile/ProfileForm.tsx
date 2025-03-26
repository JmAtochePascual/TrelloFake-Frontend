import { TProfile, TUser, userSchema } from "@/types/authType"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/services/authService"
import { toast } from "react-toastify"

type ProfileFormProps = {
  data: TProfile
}

const ProfileForm = ({ data }: ProfileFormProps) => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<TUser>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: data.name,
      email: data.email
    }
  });

  // Mutate to update profile
  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success(message);
    },
  });

  const handleOnSubmit = handleSubmit((formData: TUser) => mutate(formData));

  return (
    <form
      onSubmit={handleOnSubmit}
      autoComplete="off"
      noValidate
      className="w-full p-8 flex flex-col gap-4 rounded-md bg-white shadow-2xl">

      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="font-bold text-gray-600">
          Nombre
        </label>

        <input
          id="name"
          type="text"
          placeholder="Nombre"
          {...register("name")}
          className="w-full p-2 border-1 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />

        {errors.name && <ErrorMessage message={errors.name.message} />}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="font-bold text-gray-600">
          Email
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
        value="Guardar Cambios"
        className="w-full p-2 font-bold bg-primary text-white cursor-pointer hover:bg-primaryHover" />
    </form>
  )
}

export default ProfileForm