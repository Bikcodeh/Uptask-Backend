import { Document } from "mongoose";

export interface IUser {
    email: string;
    password: string;
    name: string;
    confirmed: boolean;
}

export interface IUserDocument extends IUser, Document { }