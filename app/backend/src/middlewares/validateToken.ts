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

  try {
    const validToken = verifyToken(token);
    req.body.data = validToken;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
