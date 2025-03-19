import AuthTitle from "@/components/auth/AuthTitle"
import { useForm } from "react-hook-form"
import { createAccountSchema, TCreateAccount } from "@/types/authType"
import { Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { toast, ToastContainer } from "react-toastify"
import { createAccount } from "@/services/authService"
import AuthRegisterForm from "@/components/auth/AuthRegisterForm"

const CreateAccount = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm<TCreateAccount>({
    resolver: zodResolver(createAccountSchema)
  });

  // Mutate to register
  const { mutate } = useMutation({
    mutationFn: createAccount,
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

  const onSubmit = handleSubmit((formData: TCreateAccount) => mutate(formData));

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

            <AuthRegisterForm
              register={register}
              errors={errors} />

            <input
              type="submit"
              value="Crear Cuenta"
              className="w-full p-3 font-bold rounded-full shadow-lg bg-primary text-white cursor-pointer hover:bg-primaryHover" />
          </form>

          <div className="max-w-[500px] mx-auto flex flex-col gap-8 text-center text-gray-600">

            <div className="flex flex-col gap-2">
              <Link
                to="/auth/login"
                className="text-gray-600 hover:underline">
                ¿Ya tienes una cuenta? <span className="font-bold text-primary">Inicia sesión aquí</span>
              </Link>
              <Link
                to="/auth/forgot-password"
                className="text-gray-600 hover:underline">
                ¿Olvidaste tu contraseña? <span className="font-bold text-primary">Recupérala aquí</span>
              </Link>
            </div>

            <p>
              Tu información está segura con nosotros. Nunca compartiremos tus datos sin tu consentimiento
            </p>
          </div>
        </div>

        <div className="hidden bg-register bg-cover bg-center w-full h-full md:block"></div>
      </div>

      <ToastContainer
        autoClose={2000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}

export default CreateAccount