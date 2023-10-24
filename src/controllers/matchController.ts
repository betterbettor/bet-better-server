import { Request, Response } from 'express';
import MatchService from '../services/matchService';
import MatchResponseData from '../interfaces/response.interface';
import OddsService from '../services/oddsService';
import Match, { MatchResponse } from '../interfaces/match.interface';
import Odds from '../interfaces/odds.interface';

const getMatchList = async (req: Request, res: Response): Promise<void> => {
  try {
    const matches = await MatchService.getMatchList();
    const matchResponse = await Promise.all(matches.map(_processMatch));
    const response = _buildMatchResponse(200, matchResponse);
    res.json(response);
  } catch (error: any) {
    if (error === undefined) {
      res.status(400).json(_buildMatchResponse(400));
    } else {
      res.status(error.status ?? 500).json(_buildMatchResponse(error.status ?? 500));
    }
  }
};

const _processMatch = async (m: Match): Promise<MatchResponse> => {
  const match: MatchResponse = {
    ...m,
    bookMakerId: 0,
    bookMakerName: '',
    odds: [],
  };

  const odds: Odds[] = await OddsService.getOddsByMatchId(m.id);

  odds.forEach((o: Odds, i) => {
    if (i === 0) {
      match.bookMakerId = o.bookMakerId;
      match.bookMakerName = o.bookMakerName;
    }

    const { home, away, draw, timestamp, ttl } = o;
    match.odds.push({ home, away, draw, timestamp, ttl });
  });
  return match;
};

const _buildMatchResponse = (statusCode: number, matchResponse: MatchResponse[] = []): MatchResponseData => {
  return {
    code: statusCode,
    matches: matchResponse,
  };
};

export default { getMatchList };
