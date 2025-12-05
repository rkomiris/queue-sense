import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { ENV, EnvUser, resolveOrganization } from '../utils/env';

type AuthContextValue = {
  user: AuthenticatedUser | null;
  login: (username: string, password: string) => Promise<AuthenticatedUser>;
  logout: () => void;
  isAuthenticated: boolean;
};

export type AuthenticatedUser = EnvUser & {
  organizationName?: string;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'queuesense::session';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuthenticatedUser;
        setUser(parsed);
      } catch (error) {
        console.error('Unable to parse stored session', error);
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    const match = ENV.users.find(
      (profile) => profile.username === username.trim() && profile.password === password.trim()
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!match) {
      throw new Error('Invalid credentials');
    }

    const org = resolveOrganization(match.orgId);
    const enriched: AuthenticatedUser = {
      ...match,
      organizationName: org?.displayName,
    };

    setUser(enriched);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enriched));
    return enriched;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
