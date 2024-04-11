import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IUser, UserBody } from '../../domain/interface';
import { AUTH_TYPES } from '../../domain/types';
import { IAuthRepository } from '../../domain/repository/AuthRepository';
import { EmailRegisteredException } from '../../../../common/exception';
import { AuthEmail } from '../../../../emails/AuthEmail';

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
}