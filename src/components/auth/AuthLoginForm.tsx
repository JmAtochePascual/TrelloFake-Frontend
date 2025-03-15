import { FieldErrors, UseFormRegister } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'
import { TLogin } from '@/types/authType'

type AuthLoginFormProps = {
  register: UseFormRegister<TLogin>
  errors: FieldErrors<TLogin>
}

const AuthLoginForm = ({ register, errors }: AuthLoginFormProps) => {
  return (
    <>
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
    </>
  )
}

export default AuthLoginForm