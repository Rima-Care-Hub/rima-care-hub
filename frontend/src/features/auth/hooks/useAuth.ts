/**
 * useAuth Hook
 * Provides authentication functionality throughout the app
 */

import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import * as authApi from '@/api/auth';
import type { LoginCredentials, SignupCaregiverData, User } from '@/types/auth';

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupCaregiverData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

/**
 * Custom hook for authentication operations
 * Handles login, signup, logout and state management
 */
export function useAuth(): UseAuthReturn {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, setAuth, logout: storeLogout, initialize } = useAuthStore();

  // Initialize auth state on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  /**
   * Login with email and password
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials);
      setAuth(response.token, response.user);
      return { success: true };
    } catch (error: any) {
      const message = error?.message || 'Login failed. Please try again.';
      return { success: false, error: message };
    }
  }, [setAuth]);

  /**
   * Register new caregiver account
   */
  const signup = useCallback(async (data: SignupCaregiverData) => {
    try {
      const response = await authApi.signupCaregiver(data);
      setAuth(response.token, response.user);
      return { success: true };
    } catch (error: any) {
      const message = error?.message || 'Registration failed. Please try again.';
      return { success: false, error: message };
    }
  }, [setAuth]);

  /**
   * Logout and redirect to login page
   */
  const logout = useCallback(() => {
    storeLogout();
    navigate('/login');
  }, [storeLogout, navigate]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout
  };
}

