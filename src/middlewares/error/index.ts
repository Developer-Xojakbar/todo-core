import { NextFunction, Request, Response } from 'express';

interface CustomError extends Error {
    statusCode: number;
    errorType: 'fail' | 'error';
    isOperational: boolean;
    details: object;
}

export const globalErrorMiddleWare = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let isOperational = err.isOperational || false;
    const details = err.details;

    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message,
        isOperational: isOperational,
        details: details,
    });

    if (!isOperational) {
        next();
    }
};
