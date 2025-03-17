import { TToken, TUpdatePassword, updatePasswordSchema } from "@/types/authType"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updatePassword } from "@/services/authService"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import ErrorMessage from "../ErrorMessage"
import { useNavigate } from "react-router-dom"

type UpdatePasswordFormProps = {
  tokenPassword: TToken['token']
}

const UpdatePasswordForm = ({ tokenPassword }: UpdatePasswordFormProps) => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<TUpdatePassword>({
    resolver: zodResolver(updatePasswordSchema)
  });

  const { mutate } = useMutation({
    mutationFn: updatePassword,
    onSuccess: (message) => {
      toast.success(message);
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Error al intentar actualizar la contraseña');
      }
    }
  })

  const onSubmit = handleSubmit((formData: TUpdatePassword) => mutate({ token: tokenPassword, formData }))

  return (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
      noValidate
      className="w-full max-w-[400px] mx-auto flex flex-col gap-4 rounded-md">

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="font-bold text-gray-600">
          Contraseña
        </label>

        <input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full p-2 border-1 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />

        {errors.password && <ErrorMessage message={errors.password.message} />}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="confirmPassword"
          className="font-bold text-gray-600">
          Confirmar Contraseña
        </label>

        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          className="w-full p-2 border-1 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />

        {errors.confirmPassword && <ErrorMessage message={errors.confirmPassword.message} />}
      </div>
      <input
        type="submit"
        value="Cambiar Contraseña"
        className="w-full p-3 font-bold rounded-full shadow-lg bg-primary text-white cursor-pointer hover:bg-secondary" />
    </form>
  )
}

export default UpdatePasswordForm