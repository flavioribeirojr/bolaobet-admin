import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';
import { Checkbox } from '../../../components/Checkbox';
import { FormError } from '../../../components/form';
import { FootballMatch } from './api-types/football-match';
import { createBetApi } from './bet.api';
import { useFormikContext } from 'formik';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export function ChampionshipMatchesSelector(props: ChampionshipMatchesSelectorProps) {
    const betApi = createBetApi();
    const [ matches, setMatches ] = useState<FootballMatch[]>([]);
    const formik = useFormikContext<{footbalMatchesIDs: number[]}>();

    useEffect(() => {
        loadMatches();
    }, [props.championshipId]);

    async function loadMatches() {
        if (props.championshipId === null) {
            return;
        }

        const matches = await betApi.getChampionshipMatches(props.championshipId);

        setMatches(matches);
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

    return (
        <React.Fragment>
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
            <FormError field="footbalMatchesIDs" />
        </React.Fragment>
    )
}

type ChampionshipMatchesSelectorProps = {
    championshipId: number | null
}

const ChampionshipLabel = styled.p`
    font-weight: 700;
    font-size: 16px;
    color: #32325d;
    margin-bottom: 25px;
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