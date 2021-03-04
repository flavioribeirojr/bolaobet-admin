import { BetStatusEnum } from '../../../../domains/bet/bet-status.enum';

export interface BetList {
    data: BetListItem[];
    recordsTotal: number;
}

export interface BetListItem {
    id: number;
    name: string;
    prize: number;
    initialInvestment: number;
    playerLimit?: number;
    status: BetStatusEnum;
    startDate: Date;
    endDate: Date;
    championship: {
        name: string;
        logo: string;
    }
}