import mongoose, { Document } from "mongoose";

export interface IUser {
    userId: string;
    email: string;
    password: string;
    name: string;
    confirmed: boolean;
}

export type IUserSimple = Pick<IUser, 'userId' | 'name' | 'email'>

export interface UserBody extends Pick<IUser, 'email' | 'name' | 'password'> {
    confirmed_password: string;
}

export interface IUserDocument extends IUser, Document { }

export interface IToken {
    token: string;
    user: IUser;
    createdAt: Date;
}

export interface ITokenDocument extends IToken, Document { }

export interface IUserCreated {
    user: IUser;
    token: IToken;
}