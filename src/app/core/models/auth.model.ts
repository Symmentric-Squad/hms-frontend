export interface RegisterUserRequest {
  fullName: string;
  email: string;
  password: string;
  address: string;
  city: string;
  gender: string;
}

export interface LoginRequest {
  username: string; // email for users/doctors, "admin" for admin
  password: string;
}

export interface RegisterUserResponse {
  fullName: string;
  email: string;
  address: string;
  city: string;
  gender: string;
  regDate: string;
  updationDate: string | null;
}

export interface LoginResponse {
  token: string;
  role: 'USER' | 'DOCTOR' | 'ADMIN';
  userId: number;
  email: string;
}