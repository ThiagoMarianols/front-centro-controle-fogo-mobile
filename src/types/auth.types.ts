export enum UserRole {
  ADMINISTRADOR = 'ADMINISTRADOR',
  AGENTE = 'AGENTE',
  OBSERVADOR = 'OBSERVADOR',
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  accessToken?: string;
  refreshToken?: string;
  expiresRefreshToken?: string;
  user?: User;
}

export interface RefreshTokenRequest {
  refreshToken: string;
  username: string;
}

export interface Patent {
  id: number;
  active: boolean;
  name: string;
}

export interface Battalion {
  name: string;
  phoneNumber: string;
  email: string;
  endereco?: any;
}

export interface Role {
  name: string;
}

export interface UserRoleItem {
  role: Role;
}

export interface User {
  id: number;
  username: string;
  email: string;
  cpf?: string;
  phoneNumber?: string;
  matriculates?: string;
  normalizedName: string;
  gender?: string;
  active: boolean;
  usingDefaultPassword?: boolean;
  emailConfirmed?: boolean;
  phoneNumberConfirmed?: boolean;
  patent?: Patent;
  battalion?: Battalion;
  userRoles?: UserRoleItem[];
  address?: any;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthContextData {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (credentials: LoginRequest) => Promise<void>;
  signOut: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}
