import AuthTitle from "@/components/auth/AuthTitle"
import ErrorMessage from "@/components/ErrorMessage"
import { resendTokenSchema, TResendToken } from "@/types/authType"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { resentToken } from "@/services/authService"
import { toast } from "react-toastify"

const ResentTokenPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TResendToken>({
    resolver: zodResolver(resendTokenSchema)
  });

  // Mutate to resent token
  const { mutate } = useMutation({
    mutationFn: resentToken,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Error al intentar reenviar el token')
      }
    },
    onSuccess: (message) => {
      toast.success(message);
      reset();
    }
  })

  const onSubmit = handleSubmit((formData: TResendToken) => mutate(formData))

  return (
    <div className="max-w-[500px] flex flex-col items-center gap-10">
      <AuthTitle text="Si no recibiste el código en tu correo o experiró, ingresa tu email y te enviaremos uno nuevo." />

      <form
        onSubmit={onSubmit}
        autoComplete="off"
        noValidate
        className="w-full max-w-[400px] mx-auto flex flex-col gap-4 rounded-md">

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
          value="Reenviar Código"
          className="w-full p-3 font-bold rounded-full shadow-lg bg-primary text-white cursor-pointer hover:bg-primaryHover" />
      </form>

      <p className="text-center text-slate-600">
        Si no encuentras el correo, revisa tu bandeja de spam o espera unos minutos antes de solicitar un nuevo código.
      </p>
    </div>
  )
}

export default ResentTokenPage