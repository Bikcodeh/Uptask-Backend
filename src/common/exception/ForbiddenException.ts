import { StatusCodes } from "http-status-codes";
import { CustomException } from "./CustomException";

export class ForbiddenException extends CustomException {
    constructor(message: string = `You don't have permission to access this resource`) {
        super(message, StatusCodes.FORBIDDEN)
    }
}