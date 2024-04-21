import { IToken, IUser, IUserCreated, IUserSimple, UserBody } from './../interface';

export interface IAuthRepository {
    createAccount(data: UserBody): Promise<IUserCreated | null>
    confirmAccount(token: string): Promise<boolean>
    doLogin(email: string, password: string): Promise<IUser>
    userExist(email: string): Promise<IUser>
    tokenExist(token: string): Promise<IToken>
    userExistByToken(token: string): Promise<IUser>
    userExistById(id: string): Promise<IUserSimple>
    createConfirmation(email: string): Promise<IToken>
    generateToken(email: string): Promise<IToken>
    updatePassword(token: string, password: string): Promise<boolean>
}