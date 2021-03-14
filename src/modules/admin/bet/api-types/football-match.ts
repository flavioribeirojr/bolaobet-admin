export interface FootballMatch {
    id: number;
    matchID: number;
    status: string;
    startDate: Date;
    endDate: Date;
    masterTeam: Team;
    visitingTeam: Team;
}

interface Team {
    id: number;
    name: string;
    teamLogoURL: string;
    teamID: number;
}