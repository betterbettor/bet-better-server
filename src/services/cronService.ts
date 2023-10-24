import { CronJob } from 'cron';
import ApiFootballService from './apiFootballService';
import MatchService from './matchService';
import oddsService from './oddsService';
import Odds from '../interfaces/odds.interface';
import { FixturesResponse, OddsResponse } from '../interfaces/apiFootballResponse.interface';
import Match from '../interfaces/match.interface';
import { LEAGUE_ID } from '../config/config';
import logger from '../utils/logger';

const twentyFourHoursInMilliseconds = 24 * 3600 * 1000;
const sevenDaysInMilliseconds = 7 * twentyFourHoursInMilliseconds;

const fetchOdds = async (): Promise<void> => {
  logger.info(`fetch odds start`);

  const leagueId = LEAGUE_ID;
  const season = 2023; // TODO::retrieve from DB

  const oddsResponse = await ApiFootballService.getOddsByLeague(leagueId, season);
  if (oddsResponse === null) return;

  const odds = _extractOddsFromResponse(oddsResponse);
  if (odds.length === 0) return;

  const [hasCreatedOdds, newMatchIds] = await Promise.all([
    oddsService.createOdds(odds),
    _extractNewMatchIds(oddsResponse),
  ]);

  logger.info(`fetch odds: odds creates = ${hasCreatedOdds}`);

  if (newMatchIds.length > 0) {
    const newMatches = await fetchMatches(newMatchIds);
    const hasCreatedMatches = await MatchService.createMatches(newMatches);
    logger.info(`fetch matches: matches creates = ${hasCreatedMatches}`);
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
  return res.response.reduce((odds: Odds[], matchResponse) => {
    const { bookmakers, fixture } = matchResponse;
    const startTime = fixture.timestamp * 1000;
    const curOdds = bookmakers.map((bookmaker) => {
      const values = bookmaker.bets[0].values;
      return {
        home: parseFloat(values.find(({ value }) => value === 'Home')?.odd ?? ''),
        away: parseFloat(values.find(({ value }) => value === 'Away')?.odd ?? ''),
        draw: parseFloat(values.find(({ value }) => value === 'Draw')?.odd ?? ''),
        timestamp: new Date(matchResponse.update).getTime(),
        matchId: fixture.id,
        bookMakerId: bookmaker.id,
        bookMakerName: bookmaker.name,
        ttl: startTime + sevenDaysInMilliseconds,
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
      ttl: startTime + sevenDaysInMilliseconds,
      lastUpdated: now,
    };
  });
};

export const oddsJob = new CronJob('0 0 */3 * * *', fetchOdds, null, false);
