import mongoose, { Schema } from 'mongoose';
import Match from '../interfaces/match.interface';

const teamSchema = {
  id: Number,
  name: String,
  code: String,
  logo: String,
};

const matchSchema = new Schema({
  id: Number,
  startTime: Number,
  league: {
    id: Number,
    name: String,
    logo: String,
    flag: String,
  },
  home: teamSchema,
  away: teamSchema,
  ttl: Number,
  lastUpdated: Number,
});

const MatchSchema = mongoose.model<Match>('Match', matchSchema);

export default MatchSchema;
