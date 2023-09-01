import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationError } from 'joi';
import { catchAsync, CustomError } from '../../utils';
import { ValidateRequest } from '../../const';

const extractErrorDetails = (errors: ValidationError) => {
    const errorsByField: { [key: string]: string[] } = {};

    errors.details.forEach((detail) => {
        if (errorsByField[detail.path[0]]) {
            errorsByField[detail.path[0]].push(detail.message);
        } else {
            errorsByField[detail.path[0]] = [detail.message];
        }
    });
    return errorsByField;
};

export const validateRequestBody = (scheme: Joi.AnySchema) => {
    return catchAsync((req: Request, res: Response, next: NextFunction) => {
        const { error } = scheme.validate(req.body, { abortEarly: false });
        if (error) {
            const details = extractErrorDetails(error);
            throw new CustomError('Validation Error Occured', 400, details);
        }

        next();
    });
};

export const validateRequestQuery = (scheme: Joi.AnySchema) => {
    return catchAsync((req: Request, res: Response, next: NextFunction) => {
        const { error } = scheme.validate(req.query, { abortEarly: false });
        if (error) {
            const details = extractErrorDetails(error);
            throw new CustomError('Validation Error Occured', 400, details);
        }

        next();
    });
};

export const validateRequest = (
    scheme: Joi.AnySchema,
    validate: ValidateRequest,
) => {
    return catchAsync((req: Request, _: Response, next: NextFunction) => {
        const { error } = scheme.validate(req[validate], { abortEarly: false });
        if (error) {
            const details = extractErrorDetails(error);
            throw new CustomError('Validation Error Occured', 400, details);
        }

        next();
    });
};
