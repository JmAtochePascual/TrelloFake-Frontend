import PasswordForm from "@/components/profile/PasswordForm"


const ChangePasswordPage = () => {


  return (
    <div className="w-full max-w-[500px] mx-auto">
      <h1 className="text-4xl font-black">Cambia tu contraseña</h1>
      <p className="mb-8 text-2xl font-light text-gray-500">Aquí puedes actualizar tu contraseña</p>

      <PasswordForm />
    </div>
  )
}

export default ChangePasswordPage