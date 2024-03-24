import colors from '@colors/colors';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { CustomException } from '../exception';
import { wrapResponse } from '../response/apiResponse';

export const errorHandlerMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(colors.white.bgRed.bold(error.stack));
  if (error instanceof CustomException) {
    res.status(error.code).json(wrapResponse({ success: false, msg: error.message }));
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      wrapResponse({
        success: false,
        msg: 'Internal server error'
      }));
  }
}
