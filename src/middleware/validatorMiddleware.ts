import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';


export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() })
    }
    next();
}