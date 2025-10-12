export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  email: string;
  createdAt: string;
}
