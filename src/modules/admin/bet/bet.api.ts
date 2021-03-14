import { createSecureApi } from '../../common/api.secure';
import { BetList } from './api-types/bet-list';
import { FootballChampionship } from './api-types/football-championship';
import { FootballMatch } from './api-types/football-match';

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

    async function getAllChampionships() {
        const response = await api.get<FootballChampionship[]>('/football-championships');

        return response.data;
    }

    async function getChampionshipMatches(championshipID: number) {
        const response = await api.get<FootballMatch[]>(`/matches/${championshipID}`);

        return response.data;
    }

    return {
        getPaginated,
        getAllChampionships,
        getChampionshipMatches
    }
}