// src/features/auth/hooks/useAuth.ts
import { useState, useCallback } from "react";

export interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  // add other known user fields here
}

type AuthReturn = {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  // add other actions as needed
};

export function useAuth(): AuthReturn {
  const [user, setUser] = useState<User | null>({
    name: "Demo User",
    email: "demo@example.com",
    role: "caregiver",
  });

  const login = useCallback(async (credentials: { email: string; password: string }) => {
    // replace with real API call:
    // const response = await auth.login(credentials)
    // setUser(response.user)
    console.log("login called", credentials.email);
    // simulate
    setUser({
      id: "1",
      name: "Demo User",
      email: credentials.email,
      role: "caregiver",
    });
  }, []);

  const logout = useCallback(() => {
    // clear session
    setUser(null);
  }, []);

  return { user, login, logout };
}


