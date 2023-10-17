import { Request, Response } from 'express';
import MatchService from '../services/matchService';
import ResponseData from '../interfaces/response.interface';
import OddsService from '../services/oddsService';
import Match, { MatchResponse } from '../interfaces/match.interface';

const getMatchList = async (req: Request, res: Response): Promise<void> => {
  try {
    const matches = await MatchService.getMatchList();
    const matchResponse = await Promise.all(matches.map(_processMatch));
    const response = _buildResponse(matchResponse);
    res.json(response);
  } catch (error: any) {
    if (error === undefined) {
      res.status(400).json({ error: 'Bad Request' });
    } else {
      res.status(error.status ?? 500).json({ code: error.status ?? 500, matches: [] });
    }
  }
};

const _processMatch = async (m: Match): Promise<MatchResponse> => {
  const match: MatchResponse = {
    ...m,
    bookMakerId: 0,
    bookMakerName: '',
    homeOdds: [],
    awayOdds: [],
    drawOdds: [],
  };

  const odds = await OddsService.getOddsByMatchId(m.id);

  odds.forEach((o, i) => {
    if (i === 0) {
      match.bookMakerId = o.bookMakerId;
      match.bookMakerName = o.bookMakerName;
    }
    match.homeOdds.push(o.home);
    match.awayOdds.push(o.away);
    match.drawOdds.push(o.draw);
  });
  return match;
};

const _buildResponse = (matchResponse: MatchResponse[]): ResponseData => {
  return {
    code: 200,
    matches: matchResponse,
  };
};

export default { getMatchList };
