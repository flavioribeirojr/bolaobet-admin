import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { AdminTemplate } from '../../../../templates/admin/admin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faAward, faBan, faEdit, faHandHoldingUsd, faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody, CardTitle } from '../../../../components/Card';
import { Table } from '../../../../components/table';
import NumberFormat from 'react-number-format';
import { useBetDetails } from './bet-details.hook';
import { BetDetailsStatusCard } from './bet-details-status-card/bet-details-status-card';
import * as dateFNS from 'date-fns';

export function BetDetails() {
    const bet = useBetDetails();

    return (
        <StyledTemplate>
            {
                (typeof bet !== 'undefined') && (
                    <React.Fragment>
                        <ChampionshipName>
                            { bet.championship.name }
                        </ChampionshipName>
                        <BetNav>
                            <BetName>
                                { bet.name }
                            </BetName>
                            <BetOptions>
                                <BetActionLink to={`/apostas/edicao/1`}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </BetActionLink>
                                <BetActionButton>
                                    <FontAwesomeIcon icon={faBan} />
                                </BetActionButton>
                            </BetOptions>
                        </BetNav>
                        <CountersGrid>
                            <CounterCard>
                                <div>
                                    <CounterCardTitle>
                                        PREMIAÇÃO
                                    </CounterCardTitle>
                                    <CounterCardPrice>
                                        <NumberFormat
                                            value={bet.prize}
                                            displayType="text"
                                            thousandSeparator prefix="R$ "
                                        />
                                    </CounterCardPrice>
                                </div>
                                <CounterCardBadge background="linear-gradient(90deg,rgba(234, 35, 74, 0.75) 50%,rgb(245,96,54))">
                                    <CounterCardBadgeIcon
                                        icon={faAward}
                                    />
                                </CounterCardBadge>
                            </CounterCard>
                            <CounterCard>
                                <div>
                                    <CounterCardTitle>
                                        INVESTIMENTO
                                    </CounterCardTitle>
                                    <CounterCardPrice>
                                        <NumberFormat
                                            value={bet.initialInvestment}
                                            displayType="text"
                                            thousandSeparator prefix="R$ "
                                        />
                                    </CounterCardPrice>
                                </div>
                                <CounterCardBadge background="linear-gradient(90deg,rgba(94, 114, 228, 0.75) 50%, rgb(130,94,228))">
                                    <CounterCardBadgeIcon
                                        icon={faHandHoldingUsd}
                                    />
                                </CounterCardBadge>
                            </CounterCard>
                            <CounterCard>
                                <div>
                                    <CounterCardTitle>
                                        TOTAL INVESTIDO
                                    </CounterCardTitle>
                                    <CounterCardPrice>
                                        R$ 0
                                    </CounterCardPrice>
                                </div>
                                <CounterCardBadge background="linear-gradient(90deg,rgba(64, 105, 251, 0.75) 50%, rgb(64,217,251))">
                                    <CounterCardBadgeIcon
                                        icon={faWallet}
                                    />
                                </CounterCardBadge>
                            </CounterCard>
                            <CounterCard>
                                <div>
                                    <CounterCardTitle>
                                        JOGADORES
                                    </CounterCardTitle>
                                    <CounterCardPrice>
                                        0
                                    </CounterCardPrice>
                                </div>
                                <CounterCardBadge background="linear-gradient(90deg,rgba(94, 114, 228, 0.75) 50%, rgb(130,94,228))">
                                    <CounterCardBadgeIcon
                                        icon={faAddressCard}
                                    />
                                </CounterCardBadge>
                            </CounterCard>
                        </CountersGrid>
                        <BetDetailsStatusCard bet={bet} />
                        <RoundsCard>
                            <CardTitle>
                                Rodadas
                            </CardTitle>
                            <RoundsCardBody>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>
                                                JOGO
                                            </th>
                                            <th>
                                                DATA
                                            </th>
                                            <th>
                                                VENCEDOR
                                            </th>
                                            <th>
                                                STATUS
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            bet.rounds.map(round => (
                                                <tr key={round.id}>
                                                    <td>
                                                        <RoundColumn>
                                                            <RoundColumnFlag
                                                                src={round.masterTeam.team.teamLogoURL}
                                                                marginType="right"
                                                            />

                                                            <RoundColumnName>
                                                                { round.masterTeam.team.name }
                                                            </RoundColumnName>

                                                            <RoundColumnIcon icon={faTimes} />

                                                            <RoundColumnName>
                                                                { round.visitingTeam.team.name }
                                                            </RoundColumnName>
                                                            <RoundColumnFlag
                                                                src={round.visitingTeam.team.teamLogoURL}
                                                                marginType="left"
                                                            />
                                                        </RoundColumn>
                                                    </td>
                                                    <td>
                                                        { dateFNS.format(new Date(round.startDate), 'dd/MM/yyyy') }
                                                    </td>
                                                    <td>
                                                        -
                                                    </td>
                                                    <td>
                                                        { round.openForBet ? 'ABERTA' : 'FINALIZADA' }
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </RoundsCardBody>
                        </RoundsCard>
                    </React.Fragment>
                )
            }
        </StyledTemplate>
    );
}

const StyledTemplate = styled(AdminTemplate)`
    header {
        height: 330px;
        position: absolute;
        width: 100%;
        left: 0;
        z-index: -1;
    }

    main {
        margin-top: 55px;
    }
`;

const ChampionshipName = styled.h3`
    font-weight: 400;
    font-size: 14px;
    color: white;
    text-transform: uppercase;
    letter-spacing: 3px;
`;

const BetNav = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const BetName = styled.h2`
    font-size: 28px;
    color: white;
    font-weight: 900;
`;

const BetOptions = styled.div`
    display: flex;
    align-items: center;
`;

const BetActionLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    border-radius: 100%;
    background: linear-gradient(90deg, #FBB140 0%, rgba(244, 115, 43, 0.9) 100%);
    color: white;
    font-size: 15px;
    margin-right: 10px;
`;

const BetActionButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    border-radius: 100%;
    border: none;
    background: linear-gradient(90deg, #E22929 0%, rgba(208, 77, 77, 0.9) 100%);
    color: white;
    font-size: 15px;
`;

const CountersGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 40px;
    margin-top: 25px;
`;

const CounterCard = styled.div`
    display: grid;
    grid-template-columns: 75% 25%;
    padding: 15px;
    box-shadow: 0 5px 8px #9a959559;
    background-color: white;
    border-radius: 8px;
    height: 100px;
`;

const CounterCardTitle = styled.p`
    color: #8898AA;
    font-weight: 700;
    font-size: 13px;
    margin-bottom: 5px;
`;

const CounterCardPrice = styled.p`
    color: #32325D;
    font-weight: 700;
    font-size: 20px;
`;

const CounterCardBadge = styled.div`
    width: 63px;
    height: 63px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    ${(props: { background: string }) => css`
        background: ${props.background};
    `}
`;

const CounterCardBadgeIcon = styled(FontAwesomeIcon)`
    color: white;
    font-size: 2em;
`;

const RoundsCard = styled(Card)`
    margin-top: 25px;
`;

const RoundsCardBody = styled(CardBody)`
    padding: 0;
    border-top: 0;
`;

const RoundColumn = styled.div`
    display: flex;
    align-items: center;
`;

const RoundColumnFlag = styled.img`
    height: 30px;
    width: 30px;
    object-fit: contain;

    ${(props: { marginType: 'left' | 'right' }) => css`
        margin-${props.marginType}: 5px;
    `}
`;

const RoundColumnName = styled.p`
    font-size: 13px;
    color: #525F7F;
`;

const RoundColumnIcon = styled(FontAwesomeIcon)`
    color: #373636;
    margin: 0 12px;
    font-size: 12px;
`;