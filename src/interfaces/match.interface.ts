import League from './league.interface';
import { OddsValues } from './odds.interface';
import Team from './team.interface';

interface Match {
  id: number;
  startTime: number;
  league: League;
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
