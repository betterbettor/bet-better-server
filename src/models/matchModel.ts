import mongoose, { Schema } from 'mongoose';
import Match from '../interfaces/match.interface';
import { teamSchema } from './teamModel';
import { leagueSchema } from './leagueModel';

const matchSchema = new Schema({
  id: {
    type: Number,
    index: true,
    unique: true,
  },
  startTime: Number,
  league: leagueSchema,
  home: teamSchema,
  away: teamSchema,
  ttl: {
    type: Date,
    index: {
      expireAfterSeconds: 0,
    },
  },
  lastUpdated: Date,
});

const MatchSchema = mongoose.model<Match>('Match', matchSchema);

export default MatchSchema;
