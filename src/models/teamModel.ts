import mongoose, { Schema } from 'mongoose';
import Team from '../interfaces/team.interface';

const teamSchema = new Schema({
    id: Number,
    name: String,
    code: String,
    logo: String
  });
  
const TeamSchema = mongoose.model<Team>('Team', teamSchema);
  
export default TeamSchema;