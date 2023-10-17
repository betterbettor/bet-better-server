import Match from '../interfaces/match.interface';
import MatchSchema from '../models/matchModel';

const getMatchList = async (): Promise<Match[]> => {
  return await MatchSchema.find({}).lean();
};
export default { getMatchList };
