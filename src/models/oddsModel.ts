import mongoose, { Schema } from 'mongoose';
import Odds from '../interfaces/odds.interface';

const oddsSchema = new Schema({
  matchId: {
    type: Number,
    index: true,
  },
  bookMakerId: Number,
  bookMakerName: String,
  timestamp: Date,
  home: Number,
  away: Number,
  draw: Number,
  ttl: {
    type: Date,
    index: {
      expireAfterSeconds: 0,
    },
  },
});

const OddsSchema = mongoose.model<Odds>('Odds', oddsSchema);

export default OddsSchema;
