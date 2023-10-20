import axios, { AxiosRequestConfig } from 'axios';
import {
  FixturesResponse,
  LeaguesResponse,
  OddsResponse,
  TeamsResponse,
} from '../interfaces/apiFootballResponse.interface';

const _callApi = async <T>(path: string, params?: Record<string, unknown>): Promise<T | null> => {
  const option: AxiosRequestConfig = {
    method: 'GET',
    baseURL: process.env.API_FOOTBALL_ENDPOINT,
    url: path,
    timeout: 3000,
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
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
    bet: 1,
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

const getFixturesByLeague = async (leagueId: number, season: number): Promise<FixturesResponse | null> => {
  const path = '/v3/fixtures';
  const params = {
    league: leagueId,
    season,
    status: 'NS',
  };
  const res = await _callApi<FixturesResponse>(path, params);
  return res;
};

const getOddsByLeague = async (leagueId: number, season: number): Promise<OddsResponse | null> => {
  const path = '/v3/odds';
  const params = {
    league: leagueId,
    season,
    bet: 1,
  };
  const res = await _callApi<OddsResponse>(path, params);
  return res;
};

export default { getFixturesByLeague, getLeagueById, getOddsByLeague, getTeamInfo };