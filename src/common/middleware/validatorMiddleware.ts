import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { wrapResponse } from '../response/apiResponse';


export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    let errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json(wrapResponse({ success: false, errors: errorsValidation.array() }))
    }
    next();
}