import { StatusCodes } from "http-status-codes";
import { CustomException } from "./CustomException";

export class TokenNotExistException extends CustomException {
    constructor(message: string = `Token not exist`) {
        super(message, StatusCodes.UNAUTHORIZED)
    }
}