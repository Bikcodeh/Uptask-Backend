import { StatusCodes } from "http-status-codes";
import { CustomException } from "./CustomException";

export class CreatingException extends CustomException {
    constructor(message: string = 'An error happened creating, please try again later.') {
        super(message, StatusCodes.BAD_REQUEST)
    }
}