import Team from '../interfaces/team.interface';
import TeamSchema from '../models/teamModel';

const getTeamById = async (id: number): Promise<Team | null> => {
  return await TeamSchema.where({ id }).findOne();
};

const upsertTeams = async (teams: Team[]): Promise<boolean> => {
  try {
    await TeamSchema.updateMany(teams, { upsert: true });
    return true;
  } catch (ex) {
    return false;
  }
};

export default { getTeamById, upsertTeams };
