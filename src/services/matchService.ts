import Match from '../interfaces/match.interface';
import MatchSchema from '../models/matchModel';

const getMatchList = async (): Promise<Match[]> => {
  return await MatchSchema.find({}, '-_id -__v -ttl -league._id -home._id -away._id').lean();
};

const createMatches = async (matches: Match[]): Promise<boolean> => {
  try {
    await MatchSchema.create(matches);
    return true;
  } catch (ex) {
    return false;
  }
};

const updateTimestamp = async (matchId: number, lastUpdated: number): Promise<boolean> => {
  try {
    await MatchSchema.updateOne({ id: matchId }, { lastUpdated });
    return true;
  } catch (ex) {
    return false;
  }
};

export default { getMatchList, createMatches, updateTimestamp };
