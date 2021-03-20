import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BetDetails } from './bet-details.dto';
import { createBetDetailsRequest } from './bet-details.request';

export function useBetDetails() {
    const betDetailsRequest = createBetDetailsRequest();
    const [ bet, setBet ] = useState<BetDetails>();
    const { id } = useParams<{ id: string }>();

    async function loadBetDetailsFromURL() {
        try {
            const bet = await betDetailsRequest.getBetDetails(parseInt(id));

            setBet(bet);
        } catch (err) {
            console.debug(err);

            toast.error('Algo errado aconteceu. Por favor contate o suporte técnico');
        }
    }

    useEffect(() => {
        loadBetDetailsFromURL();
    }, [id]);

    return bet;
}