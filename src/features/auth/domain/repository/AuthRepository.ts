import { IUserCreated, UserBody } from './../interface';

export interface IAuthRepository {
    createAccount(data: UserBody): Promise<IUserCreated | null>
}