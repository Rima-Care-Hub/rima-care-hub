/**
 * Auth Store
 * Manages authentication state across the application
 */

import { create } from 'zustand';
import type { User } from '@/types/auth';
import { getToken, setToken, clearToken } from '@/utils/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  initialize: () => void;
}

/**
 * Zustand store for auth state management
 * Persists token to localStorage
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  // Set authentication data after successful login/signup
  setAuth: (token: string, user: User) => {
    setToken(token);
    set({ token, user, isAuthenticated: true, isLoading: false });
  },

  // Clear auth state and token
  logout: () => {
    clearToken();
    set({ token: null, user: null, isAuthenticated: false, isLoading: false });
  },

  // Set loading state
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  // Initialize auth state from stored token
  initialize: () => {
    const token = getToken();
    if (token) {
      // In a real app, you'd validate the token with the server
      // For now, we just check if it exists
      set({ 
        token, 
        isAuthenticated: true, 
        isLoading: false,
        // Mock user data - in real app, decode from JWT or fetch from API
        user: { id: '1', email: 'user@example.com', name: 'User', role: 'caregiver' }
      });
    } else {
      set({ isLoading: false });
    }
  }
}));
