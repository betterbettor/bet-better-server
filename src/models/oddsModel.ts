import mongoose, { Schema } from 'mongoose';
import Odds from '../interfaces/odds.interface';

const oddsSchema = new Schema({
  matchId: Number,
  bookMakerId: Number,
  bookMakerName: String,
  timestamp: Number,
  home: Number,
  away: Number,
  draw: Number,
});

const OddsSchema = mongoose.model<Odds>('Odds', oddsSchema);

export default OddsSchema;
