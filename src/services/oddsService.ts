import Odds from '../interfaces/odds.interface';
import OddSchema from '../models/oddsModel';

const getOddsByMatchId = async (matchId: number): Promise<Odds[]> => {
    return await OddSchema.find({matchId}).sort({ timestamp: 'asc' }).exec();
}

export default {getOddsByMatchId};
