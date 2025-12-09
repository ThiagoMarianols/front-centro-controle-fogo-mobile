// @ts-ignore
import { API_URL } from '@env';

export const API_CONFIG = {
  BASE_URL: API_URL || 'http://172.26.38.130:8088/api',
  TIMEOUT: 30000,
  
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: (id: number) => `/auth/logout/${id}`,
      REFRESH_TOKEN: '/auth/refresh-token/',
      GET_USER: '/auth',
      GET_USER_BY_ID: (id: number) => `/auth/${id}`,
    },
  },
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'CentralFogo_token',
  REFRESH_TOKEN: 'CentralFogo_refreshToken',
  USER: 'CentralFogo_user',
} as const;
