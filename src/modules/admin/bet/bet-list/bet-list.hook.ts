import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BetListItem } from '../api-types/bet-list';
import { createBetApi } from '../bet.api';

export function useBetList() {
    const [ betList, setBetList ] = useState<BetListItem[]>([]);
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ totalBets, setTotalBets ] = useState(0);
    const betAPI = createBetApi();

    useEffect(() => {
        getBetsForPage();
    }, [currentPage]);

    async function getBetsForPage() {
        try {
            const bets = await betAPI.getPaginated({
                page: currentPage
            });

            setBetList(bets.data);
            setTotalBets(bets.recordsTotal);
        } catch (err) {
            console.debug(err);

            toast.error('Algo deu errado. Por favor tente novamente mais tarde.');
        }
    }

    function goToNextPage() {
        setCurrentPage(currentPage + 1);
    }

    function goToPreviousPage() {
        setCurrentPage(currentPage - 1);
    }

    return {
        betList,
        totalBets,
        goToNextPage,
        goToPreviousPage
    };
}