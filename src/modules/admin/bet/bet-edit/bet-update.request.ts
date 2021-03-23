import { createSecureApi } from '../../../common/api.secure';
import { BetEditPayload } from './bet-edit.form';

export function createBetUpdateRequest() {
    const secureAPI = createSecureApi();

    async function update(id: number, updatePayload: BetEditPayload) {
        await secureAPI.put(`/bet/update/${id}`, updatePayload);
    }

    return {
        update
    }
}