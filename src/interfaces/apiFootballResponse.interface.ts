import League from './league.interface';
import Team from './team.interface';

interface Pagination {
  current: number;
  total: number;
}

interface Response {
  get: string;
  parameters: Record<string, unknown>;
  errors: unknown[];
  results: number;
  paging: Pagination;
}

interface TeamInfo extends Team {
  country: string;
  founded: number;
  national: boolean;
}

interface Country {
  name: string;
  code: string;
  flag: string;
}

interface Season {
  year: number;
  start: string;
  end: string;
  current: true;
}

interface LeagueDetail extends League {
  country: string;
}

interface Fixture {
  id: number;
  timezone: string;
  date: string;
  timestamp: number;
}

interface BetValue {
  value: 'Home' | 'Away' | 'Draw';
  odd: string;
}

interface Bet {
  id: number;
  name: string;
  values: BetValue[];
}

interface BookMaker {
  id: number;
  name: string;
  bets: Bet[];
}

export interface FixturesResponse extends Response {
  response: Array<{
    fixture: Fixture;
    league: LeagueDetail;
    teams: {
      home: Omit<Team, 'code'>;
      away: Omit<Team, 'code'>;
    };
  }>;
}

export interface TeamsResponse extends Response {
  response: Array<{
    team: TeamInfo;
  }>;
}

export interface LeaguesResponse extends Response {
  response: Array<{
    league: {
      id: number;
      name: string;
      type: string;
      logo: string;
    };
    country: Country;
    seasons: Season[];
  }>;
}

export interface MatchResponse {
  league: LeagueDetail;
  fixture: Fixture;
  update: string;
  bookmakers: BookMaker[];
}

export interface OddsResponse extends Response {
  response: MatchResponse[];
}
