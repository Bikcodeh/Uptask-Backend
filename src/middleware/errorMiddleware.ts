import colors from '@colors/colors';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { CustomException } from '../exception';

export const errorHandlerMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(colors.white.bgRed.bold(error.stack));
  if (error instanceof CustomException) {
    res.status(error.code).json({ msg: error.message });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal server error' });
  }
}
