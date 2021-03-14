import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Card, CardBody, CardTitle } from '../../../../components/Card';
import { Checkbox } from '../../../../components/Checkbox';
import { PageNav, PageTitle } from '../../../../components/page-title';
import { AdminTemplate } from '../../../../templates/admin/admin';
import { FootballChampionship } from '../api-types/football-championship';
import { FootballMatch } from '../api-types/football-match';
import { createBetApi } from '../bet.api';
import { BetCreationValidationSchema, createEmptyBetCreationPayload } from './bet-creation.form';
import CurrencyInput from 'react-currency-input-field';
import { createBetCreationRequest } from './bet-creation.request';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Spinner } from '../../../../components/spinner';

export function BetCreation() {
    const betApi = createBetApi();
    const [ championships, setChampionships ] = useState<FootballChampionship[]>([]);
    const [ matches, setMatches ] = useState<FootballMatch[]>([]);
    const [ hasPlayerLimit, setHasPlayerLimit ] = useState(true);
    const betCreationRequest = createBetCreationRequest();
    const navigationHistory = useHistory();
    const formik = useFormik({
        initialValues: createEmptyBetCreationPayload(),
        validationSchema: BetCreationValidationSchema,
        onSubmit: saveBet,
        validateOnBlur: true
    });

    useEffect(() => {
        loadChampionships();
    }, []);

    function setChampionshipAndFetchMatches(championshipID: number) {
        formik.setFieldValue('footballChampionshipID', championshipID);

        loadChampionshipMatches(championshipID);
    }

    async function loadChampionshipMatches(championshipID: number) {
        const matches = await betApi.getChampionshipMatches(championshipID);

        setMatches(matches);
    }

    async function loadChampionships() {
        const championships = await betApi.getAllChampionships();

        setChampionships(championships);
    }

    function toggleMatch(matchId: number) {
        if (isMatchSelected(matchId)) {
            const matchesFiltered = formik.values.footbalMatchesIDs.filter(selectedMatchId => selectedMatchId !== matchId);
            formik.setFieldValue('footbalMatchesIDs', matchesFiltered);
            return;
        }

        const matchesSelected = [
            ...formik.values.footbalMatchesIDs,
            matchId
        ];

        formik.setFieldValue('footbalMatchesIDs', matchesSelected);
    }

    function isMatchSelected(matchId: number) {
        return formik.values.footbalMatchesIDs.includes(matchId);
    }

    async function saveBet() {
        formik.isSubmitting = true;

        try {
            const betCreated = await betCreationRequest.create({
                ...formik.values,
                playerLimit: hasPlayerLimit ? formik.values.playerLimit : undefined
            });

            navigationHistory.push(`/apostas/${betCreated.id}`);
        } catch (err) {
            console.debug(err);

            toast.error('Algo errado aconteceu. Por favor contate o suporte técnico.');
        } finally {
            formik.isSubmitting = false;
        }
    }

    return (
        <AdminTemplate>
            <PageNav>
                <PageTitle>
                    Nova Aposta
                </PageTitle>
            </PageNav>
            <Card>
                <CardTitle>
                    Cadastro de Aposta
                </CardTitle>
                <CardBody>
                    <form onSubmit={formik.handleSubmit}>
                        <FormRow>
                            <FormField>
                                <FormLabel>
                                    Nome da Aposta
                                </FormLabel>
                                <FormInput
                                    type="text"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {
                                    (formik.errors.name && formik.touched.name) && (
                                        <FormError>
                                            { formik.errors.name }
                                        </FormError>
                                    )
                                }
                            </FormField>

                            <FormField>
                                <FormLabel>
                                    Investimento inicial
                                </FormLabel>
                                <BetMoneyInput
                                    name="initialInvestment"
                                    value={formik.values.initialInvestment}
                                    onValueChange={value => formik.setFieldValue('initialInvestment', value)}
                                    onBlur={formik.handleBlur}
                                    decimalSeparator=","
                                    groupSeparator="."
                                    prefix="R$ "
                                />
                                {
                                    (formik.errors.initialInvestment && formik.touched.initialInvestment) && (
                                        <FormError>
                                            { formik.errors.initialInvestment }
                                        </FormError>
                                    )
                                }
                            </FormField>

                            <FormField>
                                <FormLabel>
                                    Valor do prêmio
                                </FormLabel>
                                <BetMoneyInput
                                    name="prize"
                                    value={formik.values.prize}
                                    onValueChange={value => formik.setFieldValue('prize', value)}
                                    onBlur={formik.handleBlur}
                                    decimalSeparator=","
                                    groupSeparator="."
                                    prefix="R$ "
                                />
                                {
                                    (formik.errors.prize && formik.touched.prize) && (
                                        <FormError>
                                            { formik.errors.prize }
                                        </FormError>
                                    )
                                }
                            </FormField>

                            <FormField>
                                <CheckboxLabel
                                    input={
                                        <input
                                            type="checkbox"
                                            name="limitPlayers"
                                            checked={hasPlayerLimit}
                                            onChange={() => setHasPlayerLimit(!hasPlayerLimit)}
                                            tabIndex={-1}
                                        />
                                    }
                                    color="info"
                                >
                                    Limitar n/º jogadores
                                </CheckboxLabel>
                                <FormInput
                                    type="number"
                                    name="playerLimit"
                                    value={formik.values.playerLimit}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={!hasPlayerLimit}
                                />
                                {
                                    (formik.errors.playerLimit && formik.touched.playerLimit) && (
                                        <FormError>
                                            { formik.errors.playerLimit }
                                        </FormError>
                                    )
                                }
                            </FormField>
                        </FormRow>

                        <ChampionshipLabel>
                            Selecione um Campeonato
                        </ChampionshipLabel>
                        <ChampionshipGrid>
                            {
                                championships.map(championship => (
                                    <Championship
                                        key={championship.id}
                                        onClick={() => setChampionshipAndFetchMatches(championship.id)}
                                        selected={formik.values.footballChampionshipID === championship.id}
                                    >
                                        <ChampionshipLogo src={championship.logoURL} />
                                        <Championshiptitle>
                                            { championship.name }
                                        </Championshiptitle>
                                    </Championship>
                                ))
                            }
                        </ChampionshipGrid>
                        {
                            (formik.errors.footballChampionshipID && formik.touched.footballChampionshipID) && (
                                <FormError>
                                    { formik.errors.footballChampionshipID }
                                </FormError>
                            )
                        }
                        {
                            Boolean(formik.values.footballChampionshipID) && (
                                <>
                                    <ChampionshipLabel>
                                        Selecione as rodadas para a aposta
                                    </ChampionshipLabel>
                                    <RoundsGrid>
                                        {
                                            matches.map(match => (
                                                <RoundCheckbox
                                                    key={match.id}
                                                    input={
                                                        <input 
                                                            type="checkbox"
                                                            name="footbalMatchesIDs"
                                                            onChange={() => toggleMatch(match.id)}
                                                            checked={isMatchSelected(match.id)}
                                                        />
                                                    }
                                                    color="success"
                                                >
                                                    <Round>
                                                        <RoundDate>
                                                            { (new Date(match.startDate)).toLocaleDateString() }
                                                        </RoundDate>
                                                        <FirstRoundFlag src={match.masterTeam.teamLogoURL} />
                                                        <RoundTeamName>
                                                            { match.masterTeam.name }
                                                        </RoundTeamName>
                                                        <RoundTeamBattleIcon icon={faTimes} />
                                                        <RoundTeamName>
                                                            { match.visitingTeam.name }
                                                        </RoundTeamName>
                                                        <LastRoundFlag src={match.visitingTeam.teamLogoURL} />
                                                    </Round>
                                                </RoundCheckbox>
                                            ))
                                        }
                                    </RoundsGrid>
                                    {
                                        (formik.errors.footbalMatchesIDs && formik.touched.footbalMatchesIDs) && (
                                            <FormError>
                                                { formik.errors.footbalMatchesIDs }
                                            </FormError>
                                        )
                                    }
                                </>
                            )
                        }
                        <SubmitButton type="submit">
                            {
                                formik.isSubmitting ?
                                    <SubmitButtonSpinner /> :
                                    'Salvar'
                            }
                        </SubmitButton>
                    </form>
                </CardBody>
            </Card>
        </AdminTemplate>
    );
}

const ChampionshipLabel = styled.p`
    font-weight: 700;
    font-size: 16px;
    color: #32325d;
    margin-bottom: 25px;
`;

const ChampionshipGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 25%);
    column-gap: 20px;
    row-gap: 20px;
`;

const Championship = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 30px 0;
    cursor: pointer;
    background: #dddddd7a;
    position: relative;

    &:hover {
        background: #00b09b;
        background: -webkit-linear-gradient(to right, #00b09b, #96c93d);
        background: linear-gradient(to right, #00b09b, #96c93d);

        p {
            color: white;
        }
    }

    ${ (props: { selected?: boolean }) => props.selected && css`
        background: #00b09b;
        background: -webkit-linear-gradient(to right, #00b09b, #96c93d);
        background: linear-gradient(to right, #00b09b, #96c93d);

        p {
            color: white;
        }

        &::after {
            content: "\f058";
            font-weight: 900;
            font-family: "Font Awesome 5 Free";
            color: white;
            font-size: 20px;
            position: absolute;
            top: 10px;
            right: 10px;
        }
    `}
`;

const ChampionshipLogo = styled.img`
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-bottom: 15px;
`;

const Championshiptitle = styled.p`
    color: #3e3e3e;
    font-weight: 800;
    font-size: 1.2em;
    text-align: center;
`;

const RoundsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 25%);
    column-gap: 15px;
    row-gap: 15px;
    margin-top: 25px;
`;

const RoundCheckbox = styled(Checkbox)`
    padding: 15px;
    background: #00b09b;
    background: -webkit-linear-gradient(to right, #00b09b, #96c93d);
    background: linear-gradient(to right, #00b09b, #96c93d);
    border-radius: 4px;

    .state {
        display: flex;
        justify-content: center;

        label {
            &::before {
                top: 10px !important;
                left: 10px !important;
            }
            &::after {
                top: 10px !important;
                left: 10px !important;
            }
        }
    }
`;

const Round = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;

const RoundDate = styled.p`
    width: 100%;
    color: white;
    font-weight: 900;
    letter-spacing: 1px;
    text-align: center;
`;

const RoundFlag = styled.img`
    height: 45px;
`;

const FirstRoundFlag = styled(RoundFlag)`
    margin-right: 10px;
`;

const LastRoundFlag = styled(RoundFlag)`
    margin-left: 10px;
`;

const RoundTeamName = styled.p`
    text-indent: 0;
    color: white;
    font-weight: 600;
    font-size: 14px;
`;

const RoundTeamBattleIcon = styled(FontAwesomeIcon)`
    margin: 0 10px;
    color: white;
    font-size: 12px;
`;

const FormRow = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 10px;
    margin-bottom: 25px;
`;

const FormField = styled.div``;

const FormLabel = styled.label`
    color: rgb(73,72,72);
    font-size: .875rem;
    font-weight: 600;
    display: block;
    margin-bottom: 10px;
`;

const FormError = styled.p`
    font-size: 13px;
    font-weight: 600;
    color: red;
    margin-top: 6px;
`;

const CheckboxLabel = styled(Checkbox)`
    margin-bottom: 10px;

    label {
        color: rgb(73,72,72);
        font-size: .875rem;
        font-weight: 600!important;
    }
`;

const FormInput = styled.input`
    display: block;
    width: 100%;
    height: calc(1.5em + 1.25rem + 2px);
    padding: .625rem .75rem;
    font-weight: 400;
    line-height: 1.5;
    color: #8898aa;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #dee2e6;
    border-radius: .25rem;
    box-shadow: 0 3px 2px rgba(233,236,239,.05);

    &:focus {
        color: #8898aa;
        background-color: #fff;
        border-color: #5e72e4;
        outline: 0;
        box-shadow: 0 3px 9px rgba(50,50,9,0),3px 4px 8px rgba(94,114,228,.1);
    }

    &:disabled {
        background-color: #f6f6f6;
    }
`;

const BetMoneyInput = styled(CurrencyInput)`
    display: block;
    width: 100%;
    height: calc(1.5em + 1.25rem + 2px);
    padding: .625rem .75rem;
    font-weight: 400;
    line-height: 1.5;
    color: #8898aa;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #dee2e6;
    border-radius: .25rem;
    box-shadow: 0 3px 2px rgba(233,236,239,.05);

    &:focus {
        color: #8898aa;
        background-color: #fff;
        border-color: #5e72e4;
        outline: 0;
        box-shadow: 0 3px 9px rgba(50,50,9,0),3px 4px 8px rgba(94,114,228,.1);
    }
`;

const SubmitButton = styled.button`
    text-transform: none;
    transition: all .15s ease;
    letter-spacing: .025em;
    font-size: .875rem;
    color: #fff;
    background-color: #2dce89;
    border-color: #2dce89;
    box-shadow: 0 4px 6px rgba(50,50,93,.11),0 1px 3px rgba(0,0,0,.08);
    border: 1px solid transparent;
    padding: .625rem 1.25rem;
    line-height: 1.5;
    border-radius: .25rem;
    cursor: pointer;
    margin-top: 20px;
    width: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SubmitButtonSpinner = styled(Spinner)`
    width: 30px;
    height: 30px;
`;