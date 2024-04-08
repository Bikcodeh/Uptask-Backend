import 'reflect-metadata';
import { injectable } from 'inversify';
import { IUser, IUserDocument } from '../../domain/interface';


@injectable()
export class AuthMapper {

    toIUser(userDocument: IUserDocument): IUser {
        const { _id, __v, ...userData } = userDocument.toObject();
        const user = userData as IUser;
        user.userId = _id.toString();
        return user;
    }
}