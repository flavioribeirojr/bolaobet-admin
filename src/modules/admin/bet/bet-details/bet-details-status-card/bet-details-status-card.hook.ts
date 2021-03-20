import { BetDetails } from '../bet-details.dto';
import * as dateFNS from 'date-fns';

export function useBetDetailsStatusCard(bet: BetDetails) {
    const nextRound = getBetNextRound();

    function getBetNextRound() {
        const currentDate = new Date();

        const futureRounds = bet
            .rounds
            .filter(round => dateFNS.isAfter(currentDate, new Date(round.startDate)));

        const roundsSortedByDate = [...futureRounds].sort((firstRound, nextRound) => {
            return (new Date(nextRound.startDate)).getTime() - (new Date(firstRound.startDate)).getTime();
        });

        const nextRound = roundsSortedByDate[0];

        return nextRound;
    }

    return { nextRound };
}