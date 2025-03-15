import { TRegister } from "@/types/authType"
import ErrorMessage from "../ErrorMessage"
import { FieldErrors, UseFormRegister } from "react-hook-form"

type AuthRegisterFormProps = {
  register: UseFormRegister<TRegister>
  errors: FieldErrors<TRegister>
}

const AuthRegisterForm = ({ register, errors }: AuthRegisterFormProps) => {

  return (
    <>
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
    </>
  )
}

export default AuthRegisterForm