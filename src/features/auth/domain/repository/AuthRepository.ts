import { TOKEN_STATE } from './../model/Token';
import { IUserCreated, UserBody } from './../interface';

export interface IAuthRepository {
    createAccount(data: UserBody): Promise<IUserCreated | null>
    confirmAccount(token: string): Promise<TOKEN_STATE>
}