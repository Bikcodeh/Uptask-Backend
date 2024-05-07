import 'reflect-metadata';
import { injectable } from 'inversify';
import { IToken, ITokenDocument, IUser, IUserDocument } from '../../domain/interface';


@injectable()
export class AuthMapper {

    toIUser(userDocument: IUserDocument): IUser {
        const { _id, __v, ...userData } = userDocument.toObject();
        const user = userData as IUser;
        user.userId = _id.toString();
        return user;
    }

    toIUserSimple(userDocument: IUserDocument): IUser {
        const { _id, __v, password,createdAt, updatedAt, email, confirmed, ...userData } = userDocument.toObject();
        const user = userData as IUser;
        user.userId = _id.toString();
        return user;
    }

    toIUserSimpleFromIUser(user: IUser): IUser {
        const  { userId, email, name } = user; 
        const userSimple = {
            userId,
            email, 
            name
           } as IUser;
       return userSimple
    }

    toIToken(tokenDocument: ITokenDocument): IToken {
        const { _id, __v, ...tokenData } = tokenDocument.toObject();
        const token = tokenData as IToken;
        return token;
    }

    toIUserDocument(user: IUser): IUserDocument {
        return {
          _id: user.userId,
          ...user
        } as IUserDocument;
    }
}