import { NextFunction, Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService: LeaderBoardService = new LeaderBoardService(),
  ) {}

  public static getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderBoard = await LeaderBoardService.getAll();
      res.status(200).json(leaderBoard);
    } catch (error) {
      next(error);
    }
  };

  public static getHomeInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const homeInfo = await LeaderBoardService.getHomeInfo();
      res.status(200).json(homeInfo);
    } catch (error) {
      next(error);
    }
  };

  public static getAwayInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const awayInfo = await LeaderBoardService.getAwayInfo();
      res.status(200).json(awayInfo);
    } catch (error) {
      next(error);
    }
  };
}
