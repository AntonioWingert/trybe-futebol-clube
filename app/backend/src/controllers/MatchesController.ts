import { NextFunction, Request, Response } from 'express';
import { MatchAttributes } from '../database/models/MatchModel';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(
    private matchesService: MatchesService = new MatchesService(),
  ) {}

  public static getAll = async (req: Request, res: Response):
  Promise<Response<MatchAttributes[]>> => {
    const { inProgress } = req.query;

    if (inProgress) {
      const matches = await MatchesService.getInProgress(inProgress === 'true');
      return res.status(200).json(matches);
    }

    const matches = await MatchesService.getAll();
    return res.status(200).json(matches);
  };

  public static updateFinish = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const message = await MatchesService.updateFinish(Number(id));
      return res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  };

  public static updateGoals = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    try {
      const message = await MatchesService.updateGoals(
        Number(id),
        Number(homeTeamGoals),
        Number(awayTeamGoals),
      );
      return res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  };

  public static create = async (req: Request, res: Response, next: NextFunction) => {
    const match = req.body;

    try {
      const createdMatch = await MatchesService.create(match);
      return res.status(201).json(createdMatch);
    } catch (error) {
      next(error);
    }
  };
}
