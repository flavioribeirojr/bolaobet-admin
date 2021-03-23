import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { craeteBetAPI } from '../../../../domains/bet/bet.api';
import { BetDetails } from './bet-details.dto';

export function useBetDetails() {
    const betAPI = craeteBetAPI();
    const [ bet, setBet ] = useState<BetDetails>();
    const { id } = useParams<{ id: string }>();
    const navigationHistory = useHistory();

    async function loadBetDetailsFromURL() {
        try {
            const bet = await betAPI.findByID(parseInt(id));

            setBet(bet);
        } catch (err) {
            console.debug(err);

            toast.error('Algo errado aconteceu. Por favor contate o suporte técnico');
        }
    }

    useEffect(() => {
        loadBetDetailsFromURL();
    }, [id]);

    async function erase() {
        const userConfirmed = window.confirm('Apagar aposta?');

        if (!userConfirmed) {
            return;
        }

        try {
            await betAPI.erase(parseInt(id));

            toast.success('Aposta apagada com sucesso');
            navigationHistory.push('/apostas');
        } catch (err) {
            console.debug(err);

            toast.error('Algo errado aconteceu. Por favor contate o suporte técnico');
        }
    }

    return {
        bet,
        erase
    };
}