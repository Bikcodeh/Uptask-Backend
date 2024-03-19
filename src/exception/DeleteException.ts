import { StatusCodes } from "http-status-codes";
import { CustomException } from "./CustomException";

export class DeleteException extends CustomException {
    constructor(message: string = 'An error happened deleting, please try again later.') {
        super(message, StatusCodes.BAD_REQUEST)
    }
}