import Odds from '../interfaces/odds.interface';
import OddSchema from '../models/oddsModel';

const getOddsByMatchId = async (matchId: number): Promise<Odds[]> => {
  return await OddSchema.find({ matchId }).sort({ timestamp: 'asc' }).exec();
};

const createOdds = async (odds: Odds[]): Promise<boolean> => {
  try {
    await OddSchema.create(odds);
    return true;
  } catch (ex) {
    return false;
  }
};

export default { getOddsByMatchId, createOdds };
