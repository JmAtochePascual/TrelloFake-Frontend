import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, TLogin } from "@/types/authType"
import AuthTitle from "@/components/auth/AuthTitle"
import AuthLoginForm from "@/components/auth/AuthLoginForm"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { login } from "@/services/authService"
import { toast, ToastContainer } from "react-toastify"

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit } = useForm<TLogin>({
    resolver: zodResolver(loginSchema)
  });

  // Mutate to login
  const { mutate } = useMutation({
    mutationFn: login,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      navigate('/');
    },
  });

  const onSubmit = handleSubmit((formData: TLogin) => mutate(formData));

  return (
    <>
      <div className="w-full min-h-screen grid gap-4 place-items-center md:grid-cols-2">

        <div className="w-11/12 flex flex-col gap-10">
          <AuthTitle
            text={"Crea tu cuenta y organiza tus proyectos con facilidad"}
          />

          <form
            onSubmit={onSubmit}
            autoComplete="off"
            noValidate
            className="w-full max-w-[400px] mx-auto flex flex-col gap-4 rounded-md">

            <AuthLoginForm
              register={register}
              errors={errors} />

            <input
              type="submit"
              value="Iniciar Sesión"
              className="w-full p-3 font-bold rounded-full shadow-lg bg-primary text-white cursor-pointer hover:bg-secondary" />
          </form>

          <div className="max-w-[500px] mx-auto flex flex-col gap-8 text-center text-gray-600">
            <div className="flex flex-col gap-2">
              <Link
                to="/auth/register"
                className="text-gray-600 hover:underline">
                ¿No tienes una cuenta? <span className="font-bold text-primary">Regístrate ahora</span>
              </Link>

              <Link
                to="/auth/forgot-password"
                className="text-gray-600 hover:underline">
                ¿Olvidate tu contraseña? <span className="font-bold text-primary">Recupérala aquí</span>
              </Link>
            </div>

            <p>
              Tu información está segura con nosotros. Nunca compartiremos tus datos sin tu consentimiento
            </p>
          </div>
        </div>

        <div className="hidden bg-login bg-cover bg-center w-full h-full md:block"></div>
      </div>

      <ToastContainer
        autoClose={2000}
      />
    </>
  )
}

export default LoginPage