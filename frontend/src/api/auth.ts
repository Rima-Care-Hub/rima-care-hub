/**
 * Auth API wrapper
 * Provides typed functions for authentication endpoints
 */

import { apiPost } from './client';
import type { 
  LoginCredentials, 
  SignupCaregiverData, 
  ForgotPasswordData, 
  AuthResponse 
} from '@/types/auth';

/**
 * Authenticate user with email and password
 */
export async function login(data: LoginCredentials): Promise<AuthResponse> {
  return apiPost<AuthResponse>('/auth/login', data);
}

/**
 * Register a new caregiver account
 */
export async function signupCaregiver(data: SignupCaregiverData): Promise<AuthResponse> {
  return apiPost<AuthResponse>('/auth/signup-caregiver', data);
}

/**
 * Request password reset email
 */
export async function forgotPassword(data: ForgotPasswordData): Promise<{ success: boolean }> {
  return apiPost<{ success: boolean }>('/auth/forgot', data);
}
