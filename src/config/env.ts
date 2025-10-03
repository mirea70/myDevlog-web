export type ApiEnvironment = 'local' | 'staging' | 'production';

export interface ApiConfig {
  apiBaseUrl: string;
}

const configs: Record<ApiEnvironment, ApiConfig> = {
  local: {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  },
  staging: {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://staging.example.com',
  },
  production: {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com',
  },
};

export function getApiConfig(env: ApiEnvironment = (process.env.NEXT_PUBLIC_ENV as ApiEnvironment) || 'local'): ApiConfig {
  return configs[env] ?? configs.local;
}


