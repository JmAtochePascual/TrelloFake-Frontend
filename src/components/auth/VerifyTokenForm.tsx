import { verifyToken } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import { TVerifyToken } from "@/types/authType";

type VerifyTokenFormProps = {
  setIsTokenValid: (isValid: boolean) => void;
  setTokenPassword: (password: TVerifyToken['token']) => void;
}

const VerifyTokenForm = ({ setIsTokenValid, setTokenPassword }: VerifyTokenFormProps) => {
  const [otp, setOtp] = useState('');
  const isOtpValid = otp.length === 6;

  // Mutate to confirm an user
  const { mutate } = useMutation({
    mutationFn: verifyToken,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Error al intentar confirmar');
      }
    },
    onSuccess: (message) => {
      toast.success(message);
      setIsTokenValid(true);
      setTokenPassword(otp);
      setOtp('');
    }
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ token: otp });
  }
  return (
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
        className={`bg-primary text-white px-4 py-2 rounded ${!isOtpValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primaryHover'}`} >
        Confirmar Cuenta
      </button>
    </form>
  )
}

export default VerifyTokenForm