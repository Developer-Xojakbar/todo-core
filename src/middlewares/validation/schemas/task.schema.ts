import Joi from 'joi';
import {
    validateTaskId,
    validateFindTask,
    validateFindDescription,
    validateTask,
    validateStatus,
    validateDescription,
} from './common.schema';

export const taskGetAllSchema = Joi.object({
    task: validateFindTask(),
    status: validateStatus(),
    description: validateFindDescription(),
});

export const taskCreateSchema = Joi.object({
    task: validateTask().required(),
    status: validateStatus().required(),
    description: validateDescription().required(),
});

export const taskIdSchema = Joi.object({
    id: validateTaskId(),
});

export const taskUpdateSchema = Joi.object({
    task: validateTask(),
    status: validateStatus(),
    description: validateDescription(),
});
