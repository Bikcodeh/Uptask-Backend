import { StatusCodes } from "http-status-codes";
import { CustomException } from "./CustomException";

export class UserNotFoundException extends CustomException {
    constructor(message: string = `User not found`) {
        super(message, StatusCodes.FORBIDDEN)
    }
}