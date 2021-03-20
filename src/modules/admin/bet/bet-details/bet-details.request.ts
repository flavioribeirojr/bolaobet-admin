import { createSecureApi } from '../../../common/api.secure';
import { BetDetails } from './bet-details.dto';

export function createBetDetailsRequest() {
    const secureAPI = createSecureApi();

    async function getBetDetails(id: number) {
        const response = await secureAPI.get<BetDetails>(`/bet/${id}`);

        return response.data;
    }

    return {
        getBetDetails
    }
}