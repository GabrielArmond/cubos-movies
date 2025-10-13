export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}
