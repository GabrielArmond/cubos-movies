export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse extends User {
  password: string;
}

export interface UserWithoutPassword {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export let users: User[] = [];
