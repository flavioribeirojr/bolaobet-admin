import * as Yup from 'yup';

export function createEmptyBetCreationPayload(): BetCreationPayload {
    return {
        name: '',
        prize: 0,
        initialInvestment: 0,
        playerLimit: 0,
        footballChampionshipID: null,
        footbalMatchesIDs: []
    };
}

export interface BetCreationPayload {
    name: string;
    prize: number;
    initialInvestment: number;
    playerLimit?: number;
    footballChampionshipID: number | null;
    footbalMatchesIDs: number[];
}

export const BetCreationValidationSchema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    prize: Yup.number().required('O valor do prêmio é obrigatório'),
    initialInvestment: Yup.number().required('O valor inicial para investimento é obrigatório'),
    playerLimit: Yup.number().typeError('Deve ser um número válido'),
    footballChampionshipID: Yup.number().required('Por favor escolha um campeonato').typeError('Por favor escolha um campeonato'),
    footbalMatchesIDs: Yup.array().of(Yup.number()).min(1, 'Por favor selecione ao menos 1 partida')
});