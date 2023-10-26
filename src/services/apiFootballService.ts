import axios, { AxiosRequestConfig } from 'axios';
import {
  FixturesResponse,
  LeaguesResponse,
  OddsResponse,
  TeamsResponse,
} from '../interfaces/apiFootballResponse.interface';
import { BET_ID, BOOK_MAKER_ID, getApiKey } from '../config/config';

const _callApi = async <T>(path: string, params?: Record<string, unknown>): Promise<T | null> => {
  const option: AxiosRequestConfig = {
    method: 'GET',
    baseURL: process.env.API_FOOTBALL_ENDPOINT,
    url: path,
    timeout: 3000,
    headers: {
      'X-RapidAPI-Key': getApiKey(),
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
  };

  if (params != null) option.params = { ...params };

  try {
    const res = await axios.request<T>(option);
    return res.data;
  } catch (ex) {
    return null;
  }
};

const getLeagueById = async (leagueId: number): Promise<LeaguesResponse | null> => {
  const path = '/v3/leagues';
  const params = {
    id: leagueId,
    current: 'true',
    bet: BET_ID,
  };
  const res = await _callApi<LeaguesResponse>(path, params);
  return res;
};

const getTeamInfo = async (teamId: number): Promise<TeamsResponse | null> => {
  const path = '/v3/teams';
  const params = {
    id: teamId,
  };
  const res = await _callApi<TeamsResponse>(path, params);
  return res?.results === 0 ? null : res;
};

const getFixturesByIds = async (fixtureIds: number[]): Promise<FixturesResponse | null> => {
  const path = '/v3/fixtures';
  const params = {
    ids: fixtureIds.join('-'),
  };
  const res = await _callApi<FixturesResponse>(path, params);
  return res;
};

const getOddsByLeague = async (leagueId: number, season: number, page: number = 1): Promise<OddsResponse | null> => {
  const path = '/v3/odds';
  const params = {
    league: leagueId,
    season,
    bet: BET_ID,
    bookmaker: BOOK_MAKER_ID,
    page,
  };
  const res = await _callApi<OddsResponse>(path, params);
  return res;
};

export default { getFixturesByIds, getLeagueById, getOddsByLeague, getTeamInfo };
