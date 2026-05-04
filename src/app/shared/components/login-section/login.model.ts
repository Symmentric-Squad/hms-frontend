export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginSubmitEvent {
  role: string;
  credentials: LoginCredentials;
}

export interface RoleConfig {
  role: string;
  label: string;
  icon: string;
  subtitle: string;
  showRegisterLink?: boolean;
}