import HttpException from '../utils/HttpException';
import TeamModel, { TeamAttributes } from '../database/models/TeamModel';

export default class TeamsService {
  public static async getAll(): Promise<TeamAttributes[]> {
    const teams = await TeamModel.findAll();
    return teams;
  }

  public static async getById(id: number): Promise<TeamAttributes | null> {
    const team = await TeamModel.findOne({ where: { id } });

    if (!team) {
      throw new HttpException(404, 'Team not found');
    }

    return team;
  }
}
