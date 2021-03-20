import { BetStatusEnum } from "../../../../domains/bet/bet-status.enum";

export interface BetDetails {
    id: number;
    name: string;
    championship: {
        id: number;
        name: string;
        slug: string;
        status: string;
        logoURL: string;
    };
    prize: number;
    initialInvestment: number;
    playerLimit?: number;
    status: BetStatusEnum;
    startDate: string;
    endDate: string;
    rounds: BetDetailsRound[];
}

export interface BetDetailsRound {
    id: number;
    startDate: string;
    endDate: string;
    openForBet: boolean;
    masterTeam: BetDetailsRoundTeam;
    visitingTeam: BetDetailsRoundTeam;
}

export interface BetDetailsRoundTeam {
    id: number;
    team: {
        id: number;
        name: string;
        teamLogoURL: string;
        teamID: number;
    };
    score: number;
}