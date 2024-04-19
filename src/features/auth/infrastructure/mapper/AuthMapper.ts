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

    toIToken(tokenDocument: ITokenDocument): IToken {
        const { _id, __v, ...tokenData } = tokenDocument.toObject();
        const token = tokenData as IToken;
        return token;
    }

    toIUserDocument(user: IUser): IUserDocument {
        return {
          ...user
        } as IUserDocument;
    }
}