import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IUser, UserBody } from '../../domain/interface';
import { AUTH_TYPES } from '../../domain/types';
import { IAuthRepository } from '../../domain/repository/AuthRepository';
import { EmailRegisteredException } from '../../../../common/exception';

@injectable()
export class AuthService {

    constructor(
        @inject(AUTH_TYPES.AuthRepository) private authRepository: IAuthRepository
    ) { }

    async createAccount(data: UserBody): Promise<IUser> {
        const user = await this.authRepository.createAccount(data);
        if (!user) throw new EmailRegisteredException()
        return user;
    }
}