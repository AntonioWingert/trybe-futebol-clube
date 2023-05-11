import { NextFunction, Request, Response } from 'express';
import loginSchema from '../schemas/loginSchema';

const message = 'All fields must be filled';

const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = loginSchema.validate(req.body);

  if (error?.details[0].type === 'any.required') {
    return res.status(401).json({
      message,
    });
  }

  if (error?.details[0].type === 'string.base') {
    return res.status(401).json({
      message,
    });
  }

  next();
};
export default validateLogin;
