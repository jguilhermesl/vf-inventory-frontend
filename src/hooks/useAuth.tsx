import { IUserData } from '@/@types/user';
import api from '@/api/axios';
import { handleLogin } from '@/api/login';
import { getProfile } from '@/api/user';
import { handleToast } from '@/utils/handleToast';
import { isPublicRoute } from '@/utils/isPublicRoute';
import { usePathname, useRouter } from 'next/navigation';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  isAuthenticated: boolean;
  handleAuth: (email: string, password: string) => Promise<void>;
  user: IUserData;
  handleSignOut: () => void;
}

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export default function AuthContextProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({} as IUserData);

  const router = useRouter();
  const pathname = usePathname();

  const handleAuth = async (email: string, password: string) => {
    const { token } = await handleLogin({ email, password });

    if (!token) {
      handleSignOut();
      handleToast('Credenciais inválidas.', 'error');
      return;
    }

    handleAuthenticateUser(token);
  };

  const handleSignOut = () => {
    localStorage.removeItem('userToken');
    setUser({} as IUserData);
    setIsAuthenticated(false);
    router.replace('/');
  };

  const handleGetStorageToken = useCallback(async () => {
    const token = localStorage.getItem('userToken');

    if (!token && !isAuthenticated) {
      handleSignOut();
      return;
    }

    if (!token && !isPublicRoute(pathname)) {
      return;
    }

    await handleAuthenticateUser(token);
  }, []);

  const handleAuthenticateUser = useCallback(async (token) => {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
    const user = await getProfile();
    setUser(user.user);
    setIsAuthenticated(true);
    localStorage.setItem('userToken', token);
    router.replace('/inventory');
  }, []);

  useEffect(() => {
    handleGetStorageToken();
  }, [handleGetStorageToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleAuth,
        user,
        handleSignOut,
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
