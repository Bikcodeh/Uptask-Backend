import { StatusCodes } from "http-status-codes";
import { CustomException } from "./CustomException";

export class EmailRegisteredException extends CustomException {
    constructor(message: string = 'Email already registered') {
        super(message, StatusCodes.CONFLICT)
    }
}