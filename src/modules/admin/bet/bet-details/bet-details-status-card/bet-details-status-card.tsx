import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';
import { ReactComponent as ChampionIcon } from '../../../../../asset/icons/SVG/Success.svg';
import { Card, CardBody } from '../../../../../components/Card';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { BetDetails } from '../bet-details.dto';
import { useBetDetailsStatusCard } from './bet-details-status-card.hook';
import * as dateFNS from 'date-fns';

export function BetDetailsStatusCard(props: BetDetailsStatusCardProps) {
    const { nextRound } = useBetDetailsStatusCard(props.bet);

    return (
        <StatusCard>
            <StatusCardBody>
                <StatusNextRound>
                    <StatusNextRoundTitle>
                        PRÓXIMA RODADA
                    </StatusNextRoundTitle>
                    {
                        nextRound !== undefined && (
                            <>
                                <StatusNextRoundDate>
                                    { dateFNS.format(new Date(nextRound.startDate), 'dd/MM/yyyy') }
                                </StatusNextRoundDate>
                                <StatusNextRoundMatch>
                                    <StatusNextRoundMatchFlag
                                        src={ nextRound.masterTeam.team.teamLogoURL }
                                        marginType="right"
                                    />
                                    <StatusNextRoundMatchTeamName>
                                        { nextRound.masterTeam.team.name }
                                    </StatusNextRoundMatchTeamName>

                                    <StatusNextRoundMatchIcon icon={faTimes} />

                                    <StatusNextRoundMatchTeamName>
                                        { nextRound.visitingTeam.team.name }
                                    </StatusNextRoundMatchTeamName>
                                    <StatusNextRoundMatchFlag
                                        src={ nextRound.visitingTeam.team.teamLogoURL }
                                        marginType="left"
                                    />
                                </StatusNextRoundMatch>
                            </>
                        )
                    }
                </StatusNextRound>

                <StatusCurrentChampion>
                    <StatusCurrentChampionInfo>
                        <StatusCurrentChampionInfoName>
                            Nenhum jogador campeão até o momento
                        </StatusCurrentChampionInfoName>
                    </StatusCurrentChampionInfo>
                    <StatusCurrentChampionIcon />
                </StatusCurrentChampion>
            </StatusCardBody>
        </StatusCard>
    );
}

type BetDetailsStatusCardProps = {
    bet: BetDetails
}

const StatusCard = styled(Card)`
    margin-top: 25px;
    min-height: auto;
`

const StatusCardBody = styled(CardBody)`
    display: flex;
    justify-content: space-between;
    border-top: 0;
`;

const StatusNextRound = styled.div``;

const StatusNextRoundTitle = styled.h4`
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.03em;

    color: #000000;
`;

const StatusNextRoundDate = styled.p`
    font-weight: normal;
    font-size: 12px;
    color: #AFADAD;
    margin-top: 3px;
`;

const StatusNextRoundMatch = styled.div`
    display: flex;
    align-items: center;
    margin-top: 15px;
`;

const StatusNextRoundMatchFlag = styled.img`
    height: 38px;
    width: 38px;
    object-fit: contain;

    ${(props: { marginType: 'left' | 'right' }) => css`
        margin-${props.marginType}: 8px;
    `}
`;

const StatusNextRoundMatchTeamName = styled.p`
    font-size: 14px;
    color: #525F7F;
`;

const StatusNextRoundMatchIcon = styled(FontAwesomeIcon)`
    color: #373636;
    margin: 0 12px;
    font-size: 12px;
`;

const StatusCurrentChampion = styled.div`
    display: flex;
    align-items: center;
`;

const StatusCurrentChampionInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 20px;
`;

const StatusCurrentChampionInfoName = styled.h5`
    font-weight: 600;
    font-size: 18px;
    color: #5C5C5C;
    margin-bottom: 4px;
`;

const StatusCurrentChampionInfoPoints = styled.p`
    font-weight: 300;
    font-size: 14px;
    color: #000000;
`;

const StatusCurrentChampionIcon = styled(ChampionIcon)`
    height: 64px;

    path {
        fill: #38D794;
    }
`;