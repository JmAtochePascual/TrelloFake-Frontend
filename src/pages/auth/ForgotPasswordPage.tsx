import AuthTitle from "@/components/auth/AuthTitle"
import ErrorMessage from "@/components/ErrorMessage"
import { forgotPassword } from "@/services/authService";
import { resendTokenSchema, TForgotPassword } from "@/types/authType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm<TForgotPassword>({
    resolver: zodResolver(resendTokenSchema)
  });

  // Mutate to forgot password
  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
    onSuccess: (message) => {
      reset();
      toast.success(message);
    },
  });

  const onSubmit = handleSubmit((formData: TForgotPassword) => mutate(formData));

  return (
    <div className="max-w-[500px] flex flex-col items-center gap-10">
      <AuthTitle text="Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña." />

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
          value="Reestablecer Contraseña"
          className="w-full p-3 font-bold rounded-full shadow-lg bg-primary text-white cursor-pointer hover:bg-primaryHover" />
      </form>

      <div className="flex flex-col gap-2">
        <Link
          to="/auth/login"
          className="text-gray-600 hover:underline">
          ¿Ya tienes una cuenta confirmada? <span className="font-bold text-primary">Inicia sesión aquí</span>
        </Link>
      </div>

      <p className="text-center text-slate-600">
        Si no encuentras el correo, revisa tu bandeja de spam o espera unos minutos antes de solicitar un nuevo código.
      </p>
    </div>
  )
}

export default ForgotPasswordPage