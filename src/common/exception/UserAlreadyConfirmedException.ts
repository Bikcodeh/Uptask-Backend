import { StatusCodes } from "http-status-codes";
import { CustomException } from "./CustomException";

export class UserAlreadyConfirmedException extends CustomException {
    constructor(message: string = 'User already confirmed') {
        super(message, StatusCodes.FORBIDDEN)
    }
}