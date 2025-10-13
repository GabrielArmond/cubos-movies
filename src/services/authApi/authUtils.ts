import type { AuthResponse } from '../../types/authApi';
import type { User } from '../../types/user';

export const authUtils = {
  saveAuth: (data: AuthResponse) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email,
      })
    );
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  getUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  clearAuth: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};
