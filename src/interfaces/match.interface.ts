interface Match {
  id: number;
  startTime: number;
  league: {
    id: number;
    name: string;
    logo: string;
    flag: string;
  };
  home: {
    id: number;
    name: string;
    code: string;
    logo: string;
  };
  away: {
    id: number;
    name: string;
    code: string;
    logo: string;
  };
  ttl: number;
  lastUpdated: number;
}

export interface MatchResponse extends Match {
  bookMakerId?: number;
  bookMakerName?: string;
  homeOdds: number[];
  awayOdds: number[];
  drawOdds: number[];
}

export default Match;
