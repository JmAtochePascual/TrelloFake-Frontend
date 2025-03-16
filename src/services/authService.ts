import api from "@/config/axios";
import { TLogin, TRegister } from "@/types/authType";
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
export const registerUser = async (formData: TRegister) => {
  try {
    const { data } = await api.post<TApiResponseMessage>('/auth/create', formData);
    console.log(data.message);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar registrar');
  }
};

// Confirm user
export const confirmUser = async (formData: { token: string }) => {
  try {
    const { data } = await api.post<TApiResponseMessage>('/auth/user-confirm', formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al intentar confirmar');
  }
};