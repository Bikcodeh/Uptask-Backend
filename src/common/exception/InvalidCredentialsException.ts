import { StatusCodes } from "http-status-codes";
import { CustomException } from "./CustomException";

export class InvalidCredentialsException extends CustomException {
    constructor(message: string = 'Invalid credentials, please check your username or password.') {
        super(message, StatusCodes.BAD_REQUEST)
    }
}