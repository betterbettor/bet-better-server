import Match from '../interfaces/match.interface';
import MatchSchema from '../models/matchModel';

const getMatchList = async (): Promise<Match[]> => {
  return await MatchSchema.find({}).lean();
};

const upsertMatches = async (matches: Match[]): Promise<boolean> => {
  try {
    await MatchSchema.updateMany(matches, { upsert: true });
    return true;
  } catch (ex) {
    return false;
  }
};

export default { getMatchList, upsertMatches };
