import { TOKEN_STATE } from './../../domain/model/Token';
import { hashPassword, generateToken } from './../../../../utils';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IAuthRepository } from "../../domain/repository/AuthRepository";
import { IUserCreated, UserBody } from '../../domain/interface';
import { AUTH_TYPES } from '../../domain/types';
import { AuthMapper } from '../mapper/AuthMapper';
import { User } from '../../domain/model/User';
import { Token } from '../../domain/model/Token';

@injectable()
export class AuthRepositoryMongo implements IAuthRepository {

    constructor(@inject(AUTH_TYPES.AuthMapper) private authMapper: AuthMapper) { }

    async confirmAccount(token: string): Promise<TOKEN_STATE> {
        const tokenModel = await Token.findOne({token});
        if (!tokenModel) return TOKEN_STATE.TOKEN_NOT_EXIST;
        const user = await User.findById(tokenModel.user)
        if (!user) return TOKEN_STATE.USER_NOT_EXIST;
        user.confirmed = true;
        await Promise.allSettled([user.save(), tokenModel.deleteOne()])
        return TOKEN_STATE.SUCCESS
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

    async userExist(email: string): Promise<boolean> {
        return !!(await User.findOne({ email }));
    }    
}