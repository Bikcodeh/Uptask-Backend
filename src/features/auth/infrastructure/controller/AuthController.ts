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

}