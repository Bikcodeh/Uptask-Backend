import { inject, injectable } from 'inversify';
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import 'reflect-metadata';
import { AUTH_TYPES } from '../../domain/types';
import { AuthService } from '../service/AuthService';
import { wrapResponse } from '../../../../common/response/apiResponse';
import { CustomException } from '../../../../common/exception';

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

    login = async (req: Request, res: Response) => {
        const loginSuccess = await this.authService.doLogin(req.body.email, req.body.password);
        if (loginSuccess) {
            res.status(StatusCodes.OK).json(wrapResponse({ msg: 'Authenticated' }));
        } else {
            res.status(StatusCodes.BAD_REQUEST).json(wrapResponse({ msg: 'An error happened trying to login, please try again later', success: false }));
        }
    }

    requestCode = async (req: Request, res: Response) => {
        const success = await this.authService.requestCode(req.body.email)
        if (success) {
            res.status(StatusCodes.OK).json(wrapResponse({ msg: 'We have sent you an email with a code to confirm your account' }));
        } else {
            res.status(StatusCodes.BAD_REQUEST).json(wrapResponse({ msg: 'An error happened trying to request a confirmation code, please try again later', success: false }));
        }
    }


    forgotPassword = async (req: Request, res: Response) => {
        const success = await this.authService.forgotPassword(req.body.email)
        if (success) {
            res.status(StatusCodes.OK).json(wrapResponse({ msg: 'We have sent you an email with instructions' }));
        } else {
            throw new CustomException()
        }
    }


    validateToken = async (req: Request, res: Response) => {
        const confirmed = await this.authService.validateToken(req.body.token);
        if (confirmed) {
            res.status(StatusCodes.OK).json(wrapResponse({ msg: 'Reset your passwword' }));
        } else {
            res.status(StatusCodes.BAD_REQUEST).json(wrapResponse({ msg: 'An error happened trying to validate the token, please try again later', success: false }));
        }
    }

    updatePasswordWithToken = async (req: Request, res: Response) => {
        const sucess = await this.authService.updatePasswordByToken(req.params.token, req.body.password)
        if (sucess) {
            res.status(StatusCodes.OK).json(wrapResponse({ msg: 'Password updated' }));
        } else {
            res.status(StatusCodes.BAD_REQUEST).json(wrapResponse({ msg: 'An error happened trying to update password, please try again later', success: false }));
        }
    }

}