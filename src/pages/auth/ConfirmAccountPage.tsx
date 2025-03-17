import AuthTitle from "@/components/auth/AuthTitle"
import OtpInput from "react-otp-input";
import { useState } from "react";
import { toast } from "react-toastify";
import { confirmAccount } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

const ConfirmAccountPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const isOtpValid = otp.length === 6;

  // Mutate to confirm an user
  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Error al intentar confirmar');
      }
    },
    onSuccess: (message) => {
      toast.success(message);
      setOtp('');
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
    }
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ token: otp });
  }

  return (
    <div className="max-w-[500px] flex flex-col items-center gap-10">
      <AuthTitle text="Te hemos enviado un código de verificación a tu correo. Ingrésalo para activar tu cuenta." />

      <form
        onSubmit={onSubmit}
        className="max-w-[400px] flex flex-col items-center gap-8">

        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>  </span>}
          inputType="password"
          renderInput={(props) => <input {...props}
            style={{
              width: "100%",
              height: "50px",
              fontSize: "24px",
              borderRadius: "6px",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid #e5e7eb",
              outline: "none"
            }}
          />}
        />

        <button
          disabled={!isOtpValid}
          className={`bg-primary text-white px-4 py-2 rounded ${!isOtpValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary'}`} >
          Confirmar Cuenta
        </button>
      </form>

      <Link
        to="/auth/resent-token"
        className="text-center text-slate-600">
        ¿No recibiste el código o expiró? <span className="font-bold text-primary">Reenviar código</span>
      </Link>

      <p className="text-center text-slate-600">
        Si no encuentras el correo, revisa tu bandeja de spam o espera unos minutos antes de solicitar un nuevo código.
      </p>
    </div>
  )
}

export default ConfirmAccountPage