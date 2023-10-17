import { Schema } from 'mongoose';

// define object
export const leagueSchema = new Schema({
  id: Number,
  name: String,
  logo: String,
  flag: String,
});
