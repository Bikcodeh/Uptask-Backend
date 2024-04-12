import { inject, injectable } from 'inversify';
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import 'reflect-metadata';
import { AUTH_TYPES } from '../../domain/types';
import { AuthService } from '../service/AuthService';
import { wrapResponse } from '../../../../common/response/apiResponse';

@injectable()
export class AuthController {

    constructor(
        @inject(AUTH_TYPES.AuthService) private authService: AuthService
    ) { }

    createAccount = async (req: Request, res: Response) => {
        const user = await this.authService.createAccount(req.body);
        res.status(StatusCodes.OK).json(wrapResponse({ msg: 'Create Successfuly', data: user }));
    }

    confirmAccount = async (req: Request, res: Response) => {
        const confirmed = await this.authService.confirmAccount(req.body.token);
        if (confirmed) {
            res.status(StatusCodes.OK).json(wrapResponse({ msg: 'Confirmed successfully' }));
        } else {
            res.status(StatusCodes.BAD_REQUEST).json(wrapResponse({ msg: 'An error happened confirming your account, please try again later', success: false }));
        }
    }

}