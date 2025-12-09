import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import authService from '../services/auth.service';
import apiService from '../services/api.service';
import {
  AuthContextData,
  LoginRequest,
  User,
  ApiError,
} from '../types/auth.types';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
    
    apiService.setUnauthorizedCallback(() => {
      handleUnauthorized();
    });
    
    return () => {
      apiService.clearUnauthorizedCallback();
    };
  }, []);

  const loadStoredAuth = async () => {
    try {
      const [storedUser, storedToken] = await Promise.all([
        authService.getStoredUser(),
        authService.getStoredToken(),
      ]);

      if (storedUser && storedToken) {
        setUser(storedUser);
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Erro ao carregar autenticação:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnauthorized = () => {
    console.log('Token expirado. Redirecionando para login...');
    setUser(null);
    setToken(null);
    setLoading(false);
    
    Alert.alert(
      'Sessão Expirada',
      'Sua sessão expirou. Por favor, faça login novamente.',
      [{ text: 'OK' }]
    );
  };

  const signIn = async (credentials: LoginRequest) => {
    try {
      setLoading(true);

      const response = await authService.login(credentials);

      if (!response.success) {
        throw new Error(response.message || 'Falha na autenticação');
      }

      if (!response.user) {
        throw new Error('Não foi possível obter os dados do usuário');
      }

      setUser(response.user);
      setToken(response.accessToken || null);
    } catch (error: any) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);

      if (user?.id) {
        await authService.logout(user.id);
      }

      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const storedRefreshToken = await authService.getStoredRefreshToken();
      
      if (!storedRefreshToken || !user) {
        throw new Error('Dados de refresh não disponíveis');
      }

      const newToken = await authService.refreshToken({
        refreshToken: storedRefreshToken,
        username: user.username,
      });

      setToken(newToken);
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      await signOut();
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signIn,
        signOut,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
};
