import { createSecureApi } from '../../common/api.secure';
import { BetList } from './api-types/bet-list';

export function createBetApi() {
    const api = createSecureApi();

    async function getPaginated(request: { page: number }) {
        const limit = 10;
        const page = request.page * limit;

        const response = await api.get('/bet/all', {
            params: {
                limit,
                page
            }
        });

        const betList: BetList = response.data;
        return betList;
    }

    return {
        getPaginated
    }
}