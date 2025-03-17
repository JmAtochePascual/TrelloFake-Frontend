import AuthTitle from "@/components/auth/AuthTitle"
import UpdatePasswordForm from "@/components/auth/UpdatePasswordForm";
import VerifyTokenForm from "@/components/auth/VerifyTokenForm";
import { TVerifyToken } from "@/types/authType";
import { useState } from "react"

const UpdatePasswordPage = () => {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [tokenPassword, setTokenPassword] = useState<TVerifyToken['token']>('');

  return (
    <div className="max-w-[500px] flex flex-col items-center gap-10">
      <AuthTitle text="Hemos enviado un código de verificación a tu correo. Ingresa el código para continuar con el restablecimiento de tu contraseña." />

      {
        isTokenValid
          ? <UpdatePasswordForm tokenPassword={tokenPassword} />
          : <VerifyTokenForm
            setIsTokenValid={setIsTokenValid}
            setTokenPassword={setTokenPassword}
          />
      }

      <p className="text-center text-slate-600">
        Si no encuentras el correo, revisa tu bandeja de spam o espera unos minutos antes de solicitar un nuevo código.
      </p>
    </div>
  )
}

export default UpdatePasswordPage