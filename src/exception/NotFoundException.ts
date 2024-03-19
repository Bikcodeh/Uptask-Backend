import { StatusCodes } from "http-status-codes";
import { CustomException } from "./CustomException";

export class NotFoundException extends CustomException {
    constructor(message: string = 'Element not found') {
        super(message, StatusCodes.NOT_FOUND)
    }
}