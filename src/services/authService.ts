import api from "@/config/axios";
import { TLogin, TRegister, TResendToken, TToken, TUpdatePassword } from "@/types/authType";
import { TApiResponseMessage } from "@/types/projectType";
import { isAxiosError } from "axios";

// Login user
export const login = async (formData: TLogin) => {
  try {
    await api.post<TApiResponseMessage>('/auth/login', formData);
    return;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar iniciar sesión');
  }
};

// Register user
export const createAccount = async (formData: TRegister) => {
  try {
    const { data } = await api.post<TApiResponseMessage>('/auth/create-account', formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar registrar');
  }
};

// Confirm user
export const confirmAccount = async (formData: TToken) => {
  try {
    const { data } = await api.post<TApiResponseMessage>('/auth/confirm-account', formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar confirmar');
  }
};

// Resent token
export const resentToken = async (formData: TResendToken) => {
  try {
    const { data } = await api.post<TApiResponseMessage>('/auth/resend-token', formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar reenviar el token');
  }
};

// Forgot password
export const forgotPassword = async (formData: TResendToken) => {
  try {
    const { data } = await api.post<TApiResponseMessage>('/auth/forgot-password', formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar restablecer la contraseña');
  }
};

// Verify token
export const verifyToken = async (formData: TToken) => {
  try {
    const { data } = await api.post<TApiResponseMessage>('/auth/verify-token', formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar verificar el token');
  }
};

// Update password
export const updatePassword = async ({ token, formData }: { token: TToken, formData: TUpdatePassword }) => {
  try {
    const { data } = await api.post<TApiResponseMessage>(`/auth/update-password/${token.token}`, formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar actualizar la contraseña');
  }
};