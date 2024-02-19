import { IUserData } from '@/@types/user';
import api from '@/api/axios';
import { handleLogin, ILoginBody } from '@/api/login';
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
  useMemo,
  useState,
} from 'react';

import { parseCookies, destroyCookie, setCookie } from 'nookies';

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  isAuthenticated: boolean;
  user: IUserData;
  handleAuth: ({ email, password }: ILoginBody) => Promise<void>;
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

  const handleSignOut = () => {
    try {
      destroyCookie(undefined, '@nextauth.token');
      router.push('/');
    } catch {
      console.log('Erro ao deslogar.');
    }
  };

  async function handleAuth({ email, password }: ILoginBody) {
    try {
      const response = await handleLogin({ email, password });
      const { token } = response;

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      router.push('/inventory');
      handleToast('Bem vindo de volta!', 'success');
    } catch (error) {
      handleToast('Credenciais inválidas.', 'error');
      console.log(error);
    }
  }

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies();
    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    if (token) {
      getProfile()
        .then((response) => {
          const { name, email, role } = response.user;

          setUser({
            name,
            email,
            role,
          });
        })
        .catch((err) => handleSignOut());
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      isAuthenticated: isAuthenticated,
      user: user,
      handleAuth,
      handleSignOut,
    }),
    [isAuthenticated, user.name, handleAuth, handleSignOut]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
