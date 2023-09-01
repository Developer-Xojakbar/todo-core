import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { filterProps, catchAsync, CustomError } from '../utils';

const prisma = new PrismaClient();

class TaskController {
    getAll = catchAsync(async (req: Request, res: Response) => {
        const where = filterProps(req.query);

        const totalCount = await prisma.task.count({
            where,
        });
        const tasks = await prisma.task.findMany({
            where,
            orderBy: {
                updatedAt: 'desc',
            },
        });

        res.status(200).json({ data: tasks, totalCount });
    });
    create = catchAsync(async (req: Request, res: Response) => {
        const props = req.body;

        const task = await prisma.task.create({
            data: props,
        });

        res.status(200).json({
            data: task,
            message: 'Task is created',
        });
    });
    getOne = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;

        const task = await prisma.task.findUnique({
            where: { id },
        });
        if (!task) throw new CustomError('Task is not found', 404);

        res.status(200).json({
            data: task,
        });
    });
    update = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const props = req.body;

        const task = await prisma.task
            .update({
                where: {
                    id,
                },
                data: props,
            })
            .catch(() => {
                throw new CustomError('Task is not found', 404);
            });

        res.status(200).json({
            data: task,
            message: 'Task is updated',
        });
    });
    delete = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;

        await prisma.task
            .delete({
                where: {
                    id,
                },
            })
            .catch(() => {
                throw new CustomError('Task is not found', 404);
            });

        res.status(200).json({
            message: 'Task is deleted',
        });
    });
}

export const taskController = new TaskController();
