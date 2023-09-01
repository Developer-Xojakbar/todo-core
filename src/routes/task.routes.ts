import { Router } from 'express';
import {
    validateRequest,
    validateRequestBody,
    validateRequestQuery,
    taskGetAllSchema,
    taskCreateSchema,
    taskIdSchema,
    taskUpdateSchema,
} from '../middlewares';
import { taskController } from '../controllers';
import { ValidateRequest } from '../const';

const taskRouter = Router();

taskRouter.get(
    '/all',
    validateRequestQuery(taskGetAllSchema),
    taskController.getAll,
);

taskRouter.post(
    '/create',
    validateRequestBody(taskCreateSchema),
    taskController.create,
);

taskRouter
    .route('/:id')
    .get(
        validateRequest(taskIdSchema, ValidateRequest.PARAMS),
        taskController.getOne,
    )
    .patch(
        validateRequest(taskIdSchema, ValidateRequest.PARAMS),
        validateRequestBody(taskUpdateSchema),
        taskController.update,
    )
    .delete(
        validateRequest(taskIdSchema, ValidateRequest.PARAMS),
        taskController.delete,
    );

export { taskRouter };
