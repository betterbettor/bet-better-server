import { OddsValues } from './odds.interface';
import Team from './team.interface';

interface Match {
  id: number;
  startTime: number;
  league: {
    id: number;
    name: string;
    logo: string;
    flag: string;
  };
  home: Team;
  away: Team;
  ttl: number;
  lastUpdated: number;
}

export interface MatchResponse extends Match {
  bookMakerId?: number;
  bookMakerName?: string;
  odds: OddsValues[];
}

export default Match;
