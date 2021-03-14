import { createSecureApi } from '../../../common/api.secure';
import { BetCreationPayload } from './bet-creation.form';

export function createBetCreationRequest() {
    const api = createSecureApi();

    async function create(payload: BetCreationPayload) {
        const response = await api.post<{ id: number }>('/bet/create', payload);

        return response.data;
    }

    return {
        create
    }
}