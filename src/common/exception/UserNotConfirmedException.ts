import { StatusCodes } from "http-status-codes";
import { CustomException } from "./CustomException";

export class UserNotConfirmedException extends CustomException {
    constructor(message: string = `Your account it does not have been confirmed yet, we have send an email to confirm your account`) {
        super(message, StatusCodes.FORBIDDEN)
    }
}