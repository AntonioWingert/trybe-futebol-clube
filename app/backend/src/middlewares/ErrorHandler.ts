import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/HttpException';

class errorHandler {
  public static handle(
    error: HttpException,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ) : Response {
    if (error instanceof HttpException) {
      return response.status(error.status).json({ message: error.message });
    }

    return response.status(500).json({ message: 'Internal server error' });
  }
}

export default errorHandler;
