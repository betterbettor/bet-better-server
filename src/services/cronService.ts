import { CronJob } from 'cron';
import ApiFootballService from './apiFootballService';
import MatchService from './matchService';
import oddsService from './oddsService';
import Odds from '../interfaces/odds.interface';
import { FixturesResponse, OddsResponse } from '../interfaces/apiFootballResponse.interface';
import Match from '../interfaces/match.interface';
import { LEAGUE_ID } from '../config/config';

const fetchOdds = async (): Promise<void> => {
  console.log('fetching odds', new Date().toLocaleTimeString());
  const leagueId = LEAGUE_ID;
  const season = 2023; // TODO::retrieve from DB

  const oddsResponse = await ApiFootballService.getOddsByLeague(leagueId, season);
  if (oddsResponse === null) return;

  const odds = _extractOddsFromResponse(oddsResponse);
  if (odds.length === 0) return;

  const [createOddsResult, newMatchIds] = await Promise.all([
    oddsService.createOdds(odds),
    _extractNewMatchIds(oddsResponse),
  ]);
  console.log({ createOddsResult });

  if (newMatchIds.length > 0) {
    const newMatches = await fetchMatches(newMatchIds);
    const createMatchesResult = await MatchService.createMatches(newMatches);
    console.log({ createMatchesResult });
  }

  await Promise.all(odds.map(_updateMatchTimestamp));
};

const fetchMatches = async (matchIds: number[]): Promise<Match[]> => {
  const fixturesResponse = await ApiFootballService.getFixturesByIds(matchIds);
  return fixturesResponse === null ? [] : _extractMatchesFromResponse(fixturesResponse);
};

const _updateMatchTimestamp = async (odds: Odds): Promise<boolean> => {
  return await MatchService.updateTimestamp(odds.matchId, odds.timestamp);
};

const _extractNewMatchIds = async (res: OddsResponse): Promise<number[]> => {
  const matchIds = res.response.map((match) => match.fixture.id);
  const storedMatches = await MatchService.getMatchList();
  const storedMatchesIds = storedMatches.map(({ id }) => id);

  return matchIds.reduce((newMatchIds: number[], matchId) => {
    if (storedMatchesIds.find((id) => id === matchId) === undefined) newMatchIds.push(matchId);
    return newMatchIds;
  }, []);
};

const _extractOddsFromResponse = (res: OddsResponse): Odds[] => {
  return res.response.reduce((odds: Odds[], matchRespnose) => {
    const { bookmakers, fixture } = matchRespnose;
    const curOdds = bookmakers.map((bookmaker) => {
      const values = bookmaker.bets[0].values;
      return {
        home: parseFloat(values.find(({ value }) => value === 'Home')?.odd ?? ''),
        away: parseFloat(values.find(({ value }) => value === 'Away')?.odd ?? ''),
        draw: parseFloat(values.find(({ value }) => value === 'Draw')?.odd ?? ''),
        timestamp: new Date(matchRespnose.update).getTime(),
        matchId: fixture.id,
        bookMakerId: bookmaker.id,
        bookMakerName: bookmaker.name,
      };
    });
    return odds.concat(curOdds);
  }, []);
};

const _extractMatchesFromResponse = (res: FixturesResponse): Match[] => {
  const now = Date.now();
  return res.response.map(({ fixture, league, teams }) => {
    const startTime = fixture.timestamp * 1000;
    return {
      id: fixture.id,
      startTime,
      league,
      home: teams.home,
      away: teams.away,
      ttl: startTime + 24 * 3600 * 1000,
      lastUpdated: now,
    };
  });
};

export const oddsJob = new CronJob('* * */3 * * *', fetchOdds);
