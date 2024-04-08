import { IUser, UserBody } from "../interface";

export interface IAuthRepository {
    createAccount(data: UserBody): Promise<IUser>
}