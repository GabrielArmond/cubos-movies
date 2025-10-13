import { authAPI } from './authApi';
import { authUtils } from './authApi/authUtils';

export const handleRegister = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await authAPI.register({ name, email, password });

    authUtils.saveAuth(response);

    return response;
  } catch (error: any) {
    console.error(
      'Erro no registro:',
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const handleLogin = async (email: string, password: string) => {
  try {
    const response = await authAPI.login({ email, password });

    authUtils.saveAuth(response);

    return response;
  } catch (error: any) {
    console.error(
      'Erro no login:',
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const handleLogout = () => {
  authUtils.clearAuth();
  window.location.href = '/login';
};

export const getCurrentUser = async () => {
  try {
    if (!authUtils.isAuthenticated()) {
      throw new Error('Usuário não autenticado');
    }

    const user = await authAPI.getMe();
    return user;
  } catch (error: any) {
    console.error(
      'Erro ao obter usuário:',
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
