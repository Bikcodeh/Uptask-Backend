import { hashPassword, generateToken } from './../../../../utils';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IAuthRepository } from "../../domain/repository/AuthRepository";
import { IUser, UserBody } from '../../domain/interface';
import { AUTH_TYPES } from '../../domain/types';
import { AuthMapper } from '../mapper/AuthMapper';
import { User } from '../../domain/model/User';
import { Token } from '../../domain/model/Token';

@injectable()
export class AuthRepositoryMongo implements IAuthRepository {

    constructor(@inject(AUTH_TYPES.AuthMapper) private authMapper: AuthMapper) { }

    async createAccount(data: UserBody): Promise<IUser | null> {

        const userExist = await this.userExist(data.email);
        if (userExist) return null;

        const user = new User(data);
        user.password = await hashPassword(data.password);
        const token = new Token()
        token.token = generateToken()
        token.user = user._id;
        const saved = await user.save();
        await token.save();
        return this.authMapper.toIUser(saved);
    }

    async userExist(email: string): Promise<boolean> {
        return !!(await User.findOne({ email }));
    }    
}