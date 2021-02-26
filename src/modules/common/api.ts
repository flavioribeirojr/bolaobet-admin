import axios from 'axios';
import { Environment } from '../../environment/environment';
import { createJWTTokenStorage } from './storage/jwt-token.storage';

export function createAPI() {
    const jwtTokenStorage = createJWTTokenStorage();

    return axios.create({
        baseURL: Environment.apiUrl,
        headers: {
            'Authorization': `Bearer ${jwtTokenStorage.get()}`
        }
    });
}