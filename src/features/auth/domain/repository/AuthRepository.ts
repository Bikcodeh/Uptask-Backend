import { IToken, IUser, IUserCreated, UserBody } from './../interface';

export interface IAuthRepository {
    createAccount(data: UserBody): Promise<IUserCreated | null>
    confirmAccount(token: string): Promise<boolean>
    doLogin(email: string, password: string): Promise<boolean>
    userExist(email: string): Promise<IUser>
    tokenExist(token: string): Promise<boolean>
    userExistByToken(token: string): Promise<boolean>
    createConfirmation(email: string): Promise<IToken>
}