export interface AppUser {
  id: string;
  username: string;
  role: 'ADMIN' | 'DOCTOR' | 'PATIENT' | string;
}