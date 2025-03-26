import { passwordSchema, TPassword } from "@/types/authType"
import ErrorMessage from "../ErrorMessage"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { changePassword } from "@/services/authService"
import { toast } from "react-toastify"

const PasswordForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TPassword>({
    resolver: zodResolver(passwordSchema),
  });

  // Mutate to change password
  const { mutate } = useMutation({
    mutationFn: changePassword,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
    onSuccess: (message) => {
      toast.success(message);
      reset();
    },
  });

  const handleOnSubmit = handleSubmit((formData: TPassword) => mutate(formData));

  return (
    <form
      onSubmit={handleOnSubmit}
      autoComplete="off"
      noValidate
      className="w-full p-8 flex flex-col gap-4 rounded-md bg-white shadow-2xl">

      <div className="flex flex-col gap-2">
        <label
          htmlFor="currentPassword"
          className="font-bold text-gray-600">
          Contraseña Actual
        </label>

        <input
          id="currentPassword"
          type="password"
          placeholder="Contraseña Actual"
          {...register("currentPassword")}
          className="w-full p-2 border-1 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />

        {errors.currentPassword && <ErrorMessage message={errors.currentPassword.message} />}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="font-bold text-gray-600">
          Nueva Contraseña
        </label>

        <input
          id="password"
          type="password"
          placeholder="Nueva Contraseña"
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
        value="Guardar Cambios"
        className="w-full p-2 font-bold bg-primary text-white cursor-pointer hover:bg-primaryHover" />
    </form>
  )
}

export default PasswordForm