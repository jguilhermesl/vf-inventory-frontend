import React, { createContext, ReactNode, useContext } from 'react';

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  isAuthenticated: boolean;
  handleLogin: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export default function AuthContextProvider({ children }: AuthProviderProps) {
  const isAuthenticated = true;

  const handleLogin = (email: string, password: string) => {};

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
