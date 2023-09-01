import Joi from 'joi';
import { TaskStatus } from '@prisma/client';

const mongoDocIdRegex = /^[0-9a-fA-F]{24}$/;

export const validateMongoDocId = (idType: 'taskId') => {
    return Joi.string()
        .regex(mongoDocIdRegex)
        .messages({
            'any.required': `${idType} is required`,
            'string.pattern.base': `Invalid ${idType}`,
        });
};

export const validateTaskId = () => validateMongoDocId('taskId').required();

export const validateFindTask = () => {
    return Joi.string().messages({
        'string.base': 'Task must be a string',
    });
};

export const validateFindDescription = () => {
    return Joi.string().messages({
        'string.base': 'Description must be a string',
    });
};

export const validateTask = () => {
    return Joi.string().min(4).max(40).messages({
        'string.base': 'Task must be a string',
        'string.min': 'Task must have min 4 characters',
        'string.max': 'Task must have max 40 characters',
        'string.empty': 'Task cannot be empty',
        'any.required': 'Task is required',
    });
};

export const validateStatus = () => {
    return Joi.valid(...Object.values(TaskStatus)).messages({
        'any.only': 'Not Valid Role',
        'any.required': 'Status is required',
    });
};

export const validateDescription = () => {
    return Joi.string().min(10).max(160).messages({
        'string.base': 'Description must be a string',
        'string.min': 'Description must have min 10 characters',
        'string.max': 'Description must have max 160 characters',
        'string.empty': 'Description cannot be empty',
        'any.required': 'Description is required',
    });
};
