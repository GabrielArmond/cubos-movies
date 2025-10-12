export interface BodyRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}
