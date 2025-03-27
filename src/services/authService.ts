import api from "@/config/axios";
import {
  TLogin,
  TCreateAccount,
  TResendToken,
  TConfirmAccount,
  TUpdatePassword,
  TForgotPassword,
  TVerifyToken,
  TProfile,
  TUser,
  TPassword,
  TCheckPassword
} from "@/types/authType";
import { TApiResponseMessage } from "@/types/projectType";
import { isAxiosError } from "axios";

// Register user
export const createAccount = async (formData: TCreateAccount) => {
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
export const confirmAccount = async (formData: TConfirmAccount) => {
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
export const forgotPassword = async (formData: TForgotPassword) => {
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
export const verifyToken = async (formData: TVerifyToken) => {
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
export const updatePassword = async ({ token, formData }: { token: TConfirmAccount['token'], formData: TUpdatePassword }) => {
  try {
    const { data } = await api.post<TApiResponseMessage>(`/auth/update-password/${token}`, formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar actualizar la contraseña');
  }
};

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

// Logout user
export const logout = async () => {
  try {
    await api.post<TApiResponseMessage>('/auth/logout');
    return;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar cerrar sesión');
  }
};

// Get profile
export const getProfile = async () => {
  try {
    const { data } = await api.get<TProfile>('/auth/profile');
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar obtener perfil');
  }
};

// Update profile
export const updateProfile = async (formData: TUser) => {
  try {
    const { data } = await api.put<TApiResponseMessage>('/auth/update-profile', formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar actualizar perfil');
  }
};

// Update password
export const changePassword = async (formData: TPassword) => {
  try {
    const { data } = await api.post<TApiResponseMessage>('/auth/change-password', formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar actualizar contraseña');
  }
};

// Check password to delete project
export const checkPasswordToDeleteProject = async (formData: TCheckPassword) => {
  try {
    const { data } = await api.post<TApiResponseMessage>(`/auth/check-password`, formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar verificar contraseña');
  }
};