import { injectable } from 'inversify';
import 'reflect-metadata';
import { IAuthRepository } from "../../domain/repository/AuthRepository";

@injectable()
export class AuthRepositoryMongo implements IAuthRepository {

}