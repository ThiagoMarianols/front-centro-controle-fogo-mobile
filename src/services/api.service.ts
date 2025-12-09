import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG, STORAGE_KEYS } from '../config/api.config';
import storageService from './storage.service';
import { ApiError } from '../types/auth.types';

class ApiService {
  private api: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
  }> = [];
  private onUnauthorized: (() => void) | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = await storageService.getSecureItem(STORAGE_KEYS.TOKEN);
        
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        const isRefreshTokenRequest = originalRequest.url?.includes('refresh-token');
        
        if (error.response?.status === 401 && isRefreshTokenRequest) {
          await this.clearAuth();
          if (this.onUnauthorized) {
            this.onUnauthorized();
          }
          return Promise.reject(this.handleError(error));
        }
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then(() => {
                return this.api(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshToken = await storageService.getSecureItem(
              STORAGE_KEYS.REFRESH_TOKEN
            );
            const userJson = await storageService.getItem(STORAGE_KEYS.USER);
            
            if (!refreshToken || !userJson) {
              throw new Error('Refresh token não encontrado');
            }
            
            const user = JSON.parse(userJson);
            
            const response = await this.api.post(
              API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN,
              {
                refreshToken,
                username: user.username,
              }
            );

            const { token } = response.data;
            await storageService.setSecureItem(STORAGE_KEYS.TOKEN, token);

            this.failedQueue.forEach((promise) => {
              promise.resolve();
            });
            this.failedQueue = [];

            return this.api(originalRequest);
          } catch (refreshError) {
            this.failedQueue.forEach((promise) => {
              promise.reject(refreshError);
            });
            this.failedQueue = [];

            await this.clearAuth();
            
            if (this.onUnauthorized) {
              this.onUnauthorized();
            }
            
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      return {
        message: (error.response.data as any)?.message || 'Erro ao processar requisição',
        status: error.response.status,
        errors: (error.response.data as any)?.errors,
      };
    } else if (error.request) {
      return {
        message: 'Erro de conexão. Verifique sua internet.',
        status: 0,
      };
    } else {
      return {
        message: error.message || 'Erro desconhecido',
      };
    }
  }

  private async clearAuth(): Promise<void> {
    await storageService.removeSecureItem(STORAGE_KEYS.TOKEN);
    await storageService.removeSecureItem(STORAGE_KEYS.REFRESH_TOKEN);
    await storageService.removeItem(STORAGE_KEYS.USER);
  }

  getApi(): AxiosInstance {
    return this.api;
  }

  setUnauthorizedCallback(callback: () => void): void {
    this.onUnauthorized = callback;
  }

  clearUnauthorizedCallback(): void {
    this.onUnauthorized = null;
  }
}

export default new ApiService();
