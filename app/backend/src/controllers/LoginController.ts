import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(
    private _loginService: LoginService = new LoginService(),
  ) {}

  public static login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<string> | undefined> => {
    try {
      const token = await LoginService.login(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  public static getRole = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<string> | undefined> => {
    try {
      const { role } = req.body;
      return res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  };
}
