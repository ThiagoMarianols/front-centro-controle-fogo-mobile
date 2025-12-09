import { API_CONFIG, STORAGE_KEYS } from '../config/api.config';
import apiService from './api.service';
import storageService from './storage.service';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  User,
} from '../types/auth.types';

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiService.getApi().post<LoginResponse>(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      const data = response.data;

      if (data.success && data.accessToken) {
        await storageService.setSecureItem(STORAGE_KEYS.TOKEN, data.accessToken);
        
        if (data.refreshToken) {
          await storageService.setSecureItem(
            STORAGE_KEYS.REFRESH_TOKEN,
            data.refreshToken
          );
        }

        if (data.user) {
          await storageService.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
        }
      }

      return data;
    } catch (error: any) {
      throw error;
    }
  }

  async logout(userId: number): Promise<void> {
    try {
      await apiService.getApi().post(
        API_CONFIG.ENDPOINTS.AUTH.LOGOUT(userId)
      );
    } catch (error) {
      console.error('Erro ao fazer logout no servidor:', error);
    } finally {
      await this.clearLocalAuth();
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiService.getApi().get<User>(
        API_CONFIG.ENDPOINTS.AUTH.GET_USER
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return null;
    }
  }

  async refreshToken(request: RefreshTokenRequest): Promise<string> {
    try {
      const response = await apiService.getApi().post<{ token: string }>(
        API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN,
        request
      );

      const { token } = response.data;
      await storageService.setSecureItem(STORAGE_KEYS.TOKEN, token);

      return token;
    } catch (error: any) {
      throw error;
    }
  }

  async getStoredUser(): Promise<User | null> {
    try {
      const userJson = await storageService.getItem(STORAGE_KEYS.USER);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Erro ao buscar usuário armazenado:', error);
      return null;
    }
  }

  async getStoredToken(): Promise<string | null> {
    try {
      return await storageService.getSecureItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Erro ao buscar token armazenado:', error);
      return null;
    }
  }

  async getStoredRefreshToken(): Promise<string | null> {
    try {
      return await storageService.getSecureItem(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error('Erro ao buscar refresh token armazenado:', error);
      return null;
    }
  }

  async clearLocalAuth(): Promise<void> {
    await storageService.removeSecureItem(STORAGE_KEYS.TOKEN);
    await storageService.removeSecureItem(STORAGE_KEYS.REFRESH_TOKEN);
    await storageService.removeItem(STORAGE_KEYS.USER);
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getStoredToken();
    const user = await this.getStoredUser();
    return !!(token && user);
  }

  async getUsers(): Promise<Array<{ id: number; normalizedName: string }>> {
    try {
      const response = await apiService.getApi().get<{
        items: Array<{ id: number; normalizedName: string }>;
      }>('/auth/paginator?page=1&size=100&active=true');
      return response.data.items || [];
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return [];
    }
  }
}

export default new AuthService();
