import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/JWT';

const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const validToken = verifyToken(token);

  if (!validToken) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  req.body.role = validToken;

  return next();
};

export default validateToken;
