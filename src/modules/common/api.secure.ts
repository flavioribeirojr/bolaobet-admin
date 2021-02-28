import { AxiosError, AxiosRequestConfig } from 'axios';
import { createAPI } from './api';
import { createJWTTokenStorage } from './storage/jwt-token.storage';

export function createSecureApi() {
    const api = createAPI();
    const jwtTokenStorage = createJWTTokenStorage();

    api.interceptors.request.use(addJWTTokenToRequest);

    function addJWTTokenToRequest(config: AxiosRequestConfig) {
        config.headers['Authorization'] = `Bearer ${jwtTokenStorage.get() || ''}`;

        return Promise.resolve(config);
    }

    api.interceptors.response.use(undefined, handleApiError);

    function handleApiError(error: AxiosError) {
        if (error.response && error.response.status === 403) {
            jwtTokenStorage.remove();
            window.location.replace('/login');
        }

        return Promise.reject(error);
    }

    return api;
}