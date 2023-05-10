import { NextFunction, Request, Response } from 'express';
import { TeamAttributes } from '../database/models/TeamModel';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(
    private _teamsService: TeamsService = new TeamsService(),
  ) {}

  public static getAll = async (req: Request, res: Response):
  Promise<Response<TeamAttributes[]>> => {
    const teams = await TeamsService.getAll();
    return res.status(200).json(teams);
  };

  public static getById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ):
  Promise< Response<TeamAttributes> | undefined > => {
    try {
      const { id } = req.params;
      const team = await TeamsService.getById(Number(id));
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}
