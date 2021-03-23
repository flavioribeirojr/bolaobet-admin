import { FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBetUpdateRequest } from './bet-update.request';
import { craeteBetAPI } from '../../../../domains/bet/bet.api';
import * as Yup from 'yup';

export function useBetEditForm() {
    const betAPI = craeteBetAPI();
    const betUpdateRequest = createBetUpdateRequest();
    const [ betEditForm, setBetEditForm ] = useState(createEmptyBetEditPayload());
    const { id: betID } = useParams<{ id: string }>();
    const navigationHistory = useHistory();

    useEffect(() => {
        loadBetInitialForm();
    }, [betID]);

    async function loadBetInitialForm() {
        if (!betID) {
            return;
        }

        try {
            const bet = await betAPI.findByID(parseInt(betID));

            setBetEditForm({
                name: bet.name,
                prize: bet.prize,
                initialInvestment: bet.initialInvestment,
                playerLimit: bet.playerLimit,
                footballChampionshipID: bet.championship.id,
                footbalMatchesIDs: bet.rounds.map(round => round.id)
            });
        } catch (err) {
            console.debug(err);

            toast.error('Algo errado aconteceu. Por favor contate o suporte técnico.');
        }
    }

    async function updateBet(values: BetEditPayload, formikHelpers: FormikHelpers<BetEditPayload>) {
        formikHelpers.setSubmitting(true);

        try {
            await betUpdateRequest.update(parseInt(betID), values);

            toast.success('Aposta atualizada com sucesso.');
            navigationHistory.push(`/apostas/${betID}`);
        } catch (err) {
            console.debug(err);

            toast.error('Algo errado aconteceu. Por favor contate o suporte técnico');
        } finally {
            formikHelpers.setSubmitting(false);
        }
    }

    return {
        betEditForm,
        updateBet
    };
}

export function createEmptyBetEditPayload(): BetEditPayload {
    return {
        name: '',
        prize: 0,
        initialInvestment: 0,
        playerLimit: 0,
        footballChampionshipID: null,
        footbalMatchesIDs: []
    };
}

export interface BetEditPayload {
    name: string;
    prize: number;
    initialInvestment: number;
    playerLimit?: number;
    footballChampionshipID: number | null;
    footbalMatchesIDs: number[];
}

export const BetEditValidationSchema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    prize: Yup.number().required('O valor do prêmio é obrigatório'),
    initialInvestment: Yup.number().required('O valor inicial para investimento é obrigatório'),
    playerLimit: Yup.number().typeError('Deve ser um número válido'),
    footballChampionshipID: Yup.number().required('Por favor escolha um campeonato').typeError('Por favor escolha um campeonato'),
    footbalMatchesIDs: Yup.array().of(Yup.number()).min(1, 'Por favor selecione ao menos 1 partida')
});