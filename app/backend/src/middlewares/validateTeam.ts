import { NextFunction, Request, Response } from 'express';

const validateTeam = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: 'Missing team id',
    });
  }

  if (!Number(id)) {
    return res.status(400).json({
      message: 'Id must be a number',
    });
  }

  return next();
};

export default validateTeam;
