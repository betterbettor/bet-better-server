import mongoose, { Schema } from 'mongoose';
import Match from '../interfaces/match.interface';
import { teamSchema } from './teamModel';
import { leagueSchema } from './leagueModel';

const matchSchema = new Schema({
  id: Number,
  startTime: Number,
  league: leagueSchema,
  home: teamSchema,
  away: teamSchema,
  ttl: Number,
  lastUpdated: Number,
});

const MatchSchema = mongoose.model<Match>('Match', matchSchema);

export default MatchSchema;
