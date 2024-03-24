import { ValidationError } from 'express-validator';

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    msg?: string;
    errors?: ValidationError[];
}

export function wrapResponse<T>({
    data,
    success = true,
    msg,
    errors
}: {
    data?: T,
    success?: boolean,
    msg?: string,
    errors?: ValidationError[]
}): ApiResponse<T> {
    return {
        success,
        data,
        msg,
        errors
    };
}