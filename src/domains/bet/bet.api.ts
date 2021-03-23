import { createSecureApi } from '../../modules/common/api.secure';
import { BetDetails } from './types/bet-details';

export function craeteBetAPI() {
    const secureAPI = createSecureApi();

    async function findByID(id: number) {
        const response = await secureAPI.get<BetDetails>(`/bet/${id}`);

        return response.data;
    }

    async function erase(id: number) {
        await secureAPI.delete(`/bet/delete/${id}`);
    }

    return {
        findByID,
        erase
    }
}