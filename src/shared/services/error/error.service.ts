import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class ErrorService {

    constructor() { }

    public static handleError(error: any): { message: string, statusCode: number } {
        if (error instanceof mongoose.Error.ValidationError) {
            return { message: error.message, statusCode: HttpStatus.BAD_REQUEST };
        }
        if (error instanceof mongoose.Error.CastError) {
            return { message: error.message, statusCode: HttpStatus.BAD_REQUEST };
        }
        if (error instanceof NotFoundException) {
            return { message: error.message, statusCode: HttpStatus.NOT_FOUND };
        }
        const message: string = error && error.message ? error.message : 'une erreur inconnue est survenue';
        return { message, statusCode: HttpStatus.INTERNAL_SERVER_ERROR };
    }
}
