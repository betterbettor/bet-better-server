import mongoose, { Schema } from "mongoose";
import Match from "../interfaces/match.interface";

const matchSchema = new Schema({
  id: Number,
  startTime: Number,
  league: {
    id: Number,
    name: String,
    logo: String,
    flag: String
  },
  home: {
    id: Number,
    name: String,
    code: String,
    logo: String
  },
  away: {
    id: Number,
    name: String,
    code: String,
    logo: String
  },
  ttl: Number,
  lastUpdated: Number
});

const MatchSchema = mongoose.model<Match>('Match', matchSchema);


export default MatchSchema;