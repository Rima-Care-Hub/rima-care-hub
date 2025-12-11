/**
 * API Client with stubbed endpoints
 * Simulates backend responses with artificial delay
 */

import type { ApiError } from '@/types/auth';

// Artificial delay to simulate network latency
const DELAY_MS = 400;

// Helper to create delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Stubbed user database for demo
const MOCK_USERS = [
  { id: '1', email: 'test@careconnect.com', password: 'password123', name: 'Test User', role: 'caregiver' as const }
];

/**
 * Simulates a POST request to the API
 * @param path - API endpoint path
 * @param body - Request body
 * @returns Promise with response data
 * @throws ApiError with status property
 */
export async function apiPost<T>(path: string, body: object): Promise<T> {
  await delay(DELAY_MS);

  // Route handling for stubbed endpoints
  switch (path) {
    case '/auth/login': {
      const { email, password } = body as { email: string; password: string };
      const user = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!user) {
        const error: ApiError = { message: 'Invalid email or password', status: 401 };
        throw error;
      }
      
      return {
        token: `mock-jwt-token-${Date.now()}`,
        user: { id: user.id, email: user.email, name: user.name, role: user.role }
      } as T;
    }

    case '/auth/signup-caregiver': {
      const { email, name, phone } = body as { email: string; name: string; phone: string };
      
      // Check if user already exists
      if (MOCK_USERS.find(u => u.email === email)) {
        const error: ApiError = { message: 'Email already registered', status: 409 };
        throw error;
      }
      
      const newUser = {
        id: String(MOCK_USERS.length + 1),
        email,
        name,
        role: 'caregiver' as const
      };
      
      return {
        token: `mock-jwt-token-${Date.now()}`,
        user: newUser
      } as T;
    }

    case '/auth/forgot': {
      // Always return success for security (don't reveal if email exists)
      return { success: true } as T;
    }

    default: {
      const error: ApiError = { message: 'Endpoint not found', status: 404 };
      throw error;
    }
  }
}
