import type {
  AuthResponse,
  LoginData,
  RegisterData,
} from '../../types/authApi';
import type { User } from '../../types/user';
import api from '../api';

export const authAPI = {
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },

  login: async (credentials: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/users/login', credentials);
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await api.get('/users/me');
    return response.data;
  },
};
