import HttpException from '../utils/HttpException';
import MatchModel,
{ MatchAttributes, MatchCreationAttributes }
  from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

export default class MatchesService {
  public static async getAll(): Promise<MatchAttributes[]> {
    const matches = await MatchModel.findAll(({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    }));

    return matches;
  }

  public static async getInProgress(inProgress: boolean): Promise<MatchAttributes[]> {
    const matches = await MatchModel.findAll({
      where: { inProgress },
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  public static async updateFinish(id: number): Promise<string> {
    const [updatedRows] = await MatchModel.update({ inProgress: false }, {
      where: { id },
    });

    if (updatedRows === 0) {
      throw new HttpException(404, 'Match not found');
    }

    return 'Match finished';
  }

  public static async updateGoals(
    id: number,
    homeTeamGoals:
    number,
    awayTeamGoals: number,
  ): Promise<string> {
    const [updatedRows] = await MatchModel.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      {
        where: { id },
      },
    );

    if (updatedRows === 0) {
      throw new HttpException(404, 'Match not found');
    }

    return 'Match updated';
  }

  public static async create(match: MatchCreationAttributes): Promise<MatchAttributes> {
    if (match.homeTeamId === match.awayTeamId) {
      throw new HttpException(422, 'It is not possible to create a match with two equal teams');
    }

    const homeTeam = await TeamModel.findByPk(match.homeTeamId);
    const awayTeam = await TeamModel.findByPk(match.awayTeamId);

    if (!homeTeam || !awayTeam) {
      throw new HttpException(404, 'There is no team with such id!');
    }

    const createdMatch = await MatchModel.create(match);

    return createdMatch;
  }
}
