import axios from 'axios';
import { Environment } from '../../environment/environment';

export function createAPI() {
    const api = axios.create({
        baseURL: Environment.apiUrl
    });

    return api;
}