export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  isAdmin: boolean;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  user?: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  name: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (email: string, password: string, name: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}
