import React from 'react';
import { BetStatusEnum } from '../bet-status.enum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

export function BetStatusIndicator(props: BetStatusIndicatorProps) {
    return (
        <StatusBadge color={colorByStatus[props.status]}>
            <StatusBadgeIcon icon={faCircle} />
            <StatusBadgeText>
                { textByStatus[props.status] }
            </StatusBadgeText>
        </StatusBadge>
    );
}

type BetStatusIndicatorProps = {
    status: BetStatusEnum
}

const colorByStatus: { [key in BetStatusEnum]: string } = {
    [BetStatusEnum.closed]: '#da5b5b',
    [BetStatusEnum.finished]: '#33cd1d',
    [BetStatusEnum.inProgress]: '#ff7a39',
    [BetStatusEnum.open]: '#688bf4'
};

const textByStatus: { [key in BetStatusEnum]: string } = {
    [BetStatusEnum.closed]: 'Fechada',
    [BetStatusEnum.finished]: 'Finalizada',
    [BetStatusEnum.inProgress]: 'Em Progresso',
    [BetStatusEnum.open]: 'Aberta'
};

const StatusBadge = styled.div`
    display: flex;
    align-items: center;

    ${(props: { color: string }) => css`color: ${props.color};`}
`;

const StatusBadgeIcon = styled(FontAwesomeIcon)`
    font-size: 12px;
    margin-right: 8px;
`;

const StatusBadgeText = styled.p`
    font-weight: bold;
`;