export interface User {
  id: string;
  username: string;
  email: string;
}

export interface CreateUserDTO {
  username: string | null;
  email: string;
  password: string;
}

export let users: User[] = [];
