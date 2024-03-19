import { StatusCodes } from "http-status-codes";

export class CustomException extends Error {

    public readonly code: number;

    constructor(message: string = 'An error happened, please try again later.', code: number = StatusCodes.BAD_REQUEST) {
        super(message)
        this.code = code;
    }
}