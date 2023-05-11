import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/HttpException';

export default class loginValidations {
  public static validateFields(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new HttpException(400, 'All fields must be filled');
      }

      if (password.length < 6) {
        throw new HttpException(401, 'Invalid email or password');
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  public static validateEmail(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void {
    try {
      const { email } = req.body;
      const regex = /^\S+@\S+\.\S+$/;

      if (!email.match(regex)) {
        throw new HttpException(401, 'Invalid email or password');
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}
