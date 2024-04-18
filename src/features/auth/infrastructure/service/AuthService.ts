import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IUser, UserBody } from '../../domain/interface';
import { AUTH_TYPES } from '../../domain/types';
import { IAuthRepository } from '../../domain/repository/AuthRepository';
import { EmailRegisteredException, InvalidCredentialsException, TokenNotExistException, UserAlreadyConfirmedException, UserNotConfirmedException, UserNotFoundException } from '../../../../common/exception';
import { AuthEmail } from '../../../../emails/AuthEmail';
import { checkPassword } from './../../../../utils';

@injectable()
export class AuthService {

    constructor(
        @inject(AUTH_TYPES.AuthRepository) private authRepository: IAuthRepository
    ) { }

    async createAccount(data: UserBody): Promise<IUser> {
        const userData = await this.authRepository.createAccount(data);
        if (!userData.user) throw new EmailRegisteredException();
        await AuthEmail.sendConfirmationEmail({
            email: userData.user.email,
            token: userData.token.token,
            name: userData.user.name
        })
        return userData.user;
    }

    async confirmAccount(token: string): Promise<boolean> {
        if (!await this.authRepository.tokenExist(token)) {
            throw new TokenNotExistException()
        }
        if (!await this.authRepository.userExistByToken(token)) {
            throw new UserNotFoundException()
        }
        return await this.authRepository.confirmAccount(token);
    }

    async doLogin(email: string, password: string): Promise<boolean> {
        const user = await this.authRepository.userExist(email)
        if (!user) {
            throw new UserNotFoundException()
        }

        if (!user.confirmed) {
            const token = await this.authRepository.createConfirmation(email)
            await AuthEmail.sendConfirmationEmail({
                email: user.email,
                token: token.token,
                name: user.name
            });
            throw new UserNotConfirmedException();
        }

        const correctPassword = await checkPassword(password, user.password);
        if (!correctPassword) {
            throw new InvalidCredentialsException();
        }
        return true;
    }

    async requestCode(email: string): Promise<boolean> {
        const user = await this.authRepository.userExist(email)
        if (!user) {
            throw new UserNotFoundException()
        }

        if (user.confirmed) {
            throw new UserAlreadyConfirmedException()
        }
        const token = await this.authRepository.generateToken(email);
        await AuthEmail.sendConfirmationEmail({
            email: user.email,
            token: token.token,
            name: user.name
        });
        return true;
    }

    async forgotPassword(email: string): Promise<boolean> {
        const user = await this.authRepository.userExist(email)
        if (!user) {
            throw new UserNotFoundException()
        }

        const token = await this.authRepository.generateToken(email);
        await AuthEmail.sendForgotPasswordEmail({
            email: user.email,
            token: token.token,
            name: user.name
        });
        return true;
    }

    async validateToken(token: string): Promise<boolean> {
        const tokenExist = await this.authRepository.userExistByToken(token);
        if (tokenExist) {
            return true;
        } else {
            throw new TokenNotExistException()
        }
    }
}