import { hashPassword } from './../../../../utils/index';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IAuthRepository } from "../../domain/repository/AuthRepository";
import { IUser, UserBody } from '../../domain/interface';
import { AUTH_TYPES } from '../../domain/types';
import { AuthMapper } from '../mapper/AuthMapper';
import { User } from '../../domain/model/User';

@injectable()
export class AuthRepositoryMongo implements IAuthRepository {

    constructor(@inject(AUTH_TYPES.AuthMapper) private authMapper: AuthMapper) { }

    async createAccount(data: UserBody): Promise<IUser> {
        const user = new User(data);
        user.password = await hashPassword(data.password);
        const saved = await user.save();
        return this.authMapper.toIUser(saved);
    }
}