import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { wrapResponse } from '../response/apiResponse';
import { container } from '../../config';
import { AuthService, IUserSimple } from '../../features/auth';

declare global {
    namespace Express {
        interface Request {
            user?: IUserSimple
        }
    }
}

const authService = container.resolve(AuthService);

export const authenticateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        return res.status(StatusCodes.UNAUTHORIZED).json(wrapResponse({ success: false, msg: 'Not Authorized' }));
    }

    const [, token] = bearer.split(' ');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === 'object' && decoded.id) {
            const user = await authService.userExistById(decoded.id);

            if (user) {
                req.user = user;
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(wrapResponse({ success: false, msg: 'Token Invalid' }))
            }
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(wrapResponse({ success: false, msg: 'Token Invalid' }))
    }

    next();
}