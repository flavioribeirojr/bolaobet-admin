import { createAPI } from '../../common/api';
import { AdminSigninPayload } from './types/admin-signin-payload';

export function createAdminSigninAPI() {
    const api = createAPI();

    async function signin(signinPayload: AdminSigninPayload) {
        const response = await api.post('/admin/login', signinPayload);
        const token: string = response.data;

        return token;
    }

    return {
        signin
    }
}