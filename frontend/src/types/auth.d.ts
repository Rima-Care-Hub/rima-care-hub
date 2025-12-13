// Auth type definitions

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCaregiverData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'caregiver' | 'admin';
}

export interface ApiError {
  message: string;
  status: number;
}
