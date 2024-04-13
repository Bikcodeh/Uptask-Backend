import { hashPassword, generateToken } from './../../../../utils';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IAuthRepository } from "../../domain/repository/AuthRepository";
import { IToken, IUser, IUserCreated, UserBody } from '../../domain/interface';
import { AUTH_TYPES } from '../../domain/types';
import { AuthMapper } from '../mapper/AuthMapper';
import { User } from '../../domain/model/User';
import { Token } from '../../domain/model/Token';

@injectable()
export class AuthRepositoryMongo implements IAuthRepository {

    constructor(@inject(AUTH_TYPES.AuthMapper) private authMapper: AuthMapper) { }

    async doLogin(email: string, password: string): Promise<boolean> {
        const user = await User.findOne({ email });
        return false;

    }

    async confirmAccount(token: string): Promise<boolean> {
        const tokenModel = await Token.findOne({ token });
        const user = await User.findById(tokenModel.user)
        user.confirmed = true;
        await Promise.allSettled([user.save(), tokenModel.deleteOne()])
        return true
    }

    async createAccount(data: UserBody): Promise<IUserCreated | null> {

        const userExist = await this.userExist(data.email);
        if (userExist) return null;

        const user = new User(data);
        user.password = await hashPassword(data.password);
        const token = new Token()
        token.token = generateToken()
        token.user = user._id;
        const saved = await user.save();
        const savedToken = await token.save();
        return {
            user: this.authMapper.toIUser(saved),
            token: this.authMapper.toIToken(savedToken)
        };
    }

    async createConfirmation(email: string): Promise<IToken> {
        const user = await User.findOne({ email });
        const token = new Token()
        token.token = generateToken()
        token.user = user._id;
        await user.save();
        const savedToken = await token.save();
        return this.authMapper.toIToken(savedToken);
    }

    async userExist(email: string): Promise<IUser> {
        const user = await User.findOne({ email });
        if (!user) {
            return null
        }
        return this.authMapper.toIUser(user);
    }

    async userExistByToken(token: string): Promise<boolean> {
        const tokenModel = await Token.findOne({ token });
        return (!!(await User.findById(tokenModel.user)))
    }

    async tokenExist(token: string): Promise<boolean> {
        return !!(await Token.findOne({ token }));
    }
}