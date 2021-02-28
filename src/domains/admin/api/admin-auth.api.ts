import { createSecureApi } from '../../../modules/common/api.secure';
import { Admin } from '../admin';

export function createAdminAuthAPI() {
    const api = createSecureApi();

    async function getJWTOwner() {
        const response = await api.get('/admin/current');
        const admin: Admin = response.data;

        return admin;
    }

    return {
        getJWTOwner
    }
}