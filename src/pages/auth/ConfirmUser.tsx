import AuthTitle from "@/components/auth/AuthTitle"
import OtpInput from "react-otp-input";
import { useState } from "react";
import { toast } from "react-toastify";
import { confirmUser } from "@/services/authService";

const ConfirmUser = () => {
  const [otp, setOtp] = useState('');
  const isOtpValid = otp.length === 6;

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const message = await confirmUser({ token: otp });
      toast.success(message);
      setOtp('');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Error al intentar confirmar');
      }
    }
  }

  return (
    <div className="max-w-[500px] flex flex-col items-center gap-10">
      <AuthTitle text="Te hemos enviado un código de verificación a tu correo. Ingrésalo para activar tu cuenta." />

      <form
        onSubmit={handleConfirm}
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

      <p className="text-center text-slate-600">
        Si no encuentras el correo, revisa tu bandeja de spam o espera unos minutos antes de solicitar un nuevo código.
      </p>
    </div>
  )
}

export default ConfirmUser