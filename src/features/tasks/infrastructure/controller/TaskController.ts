import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TASK_TYPES } from '../../domain/types';
import { CustomException } from '../../../../exception';
import { TaskService } from '../service/TaskService';

@injectable()
export class Taskcontroller {
    constructor(
        @inject(TASK_TYPES.TaskService) private taskService: TaskService
    ) { }

    createTask = async (req: Request, res: Response) => {
        const task = await this.taskService.createTask(req.body, req.params.projectId);
        res.status(StatusCodes.OK).json({ msg: 'Task created', data: task }).send()
    }

    getProjectTasks = async (req: Request, res: Response) => {
        const tasks = await this.taskService.getProjectTasks(req.params.projectId);
        res.status(StatusCodes.OK).json(tasks);
    }

    getTaskById = async (req: Request, res: Response) => {
        const task = await this.taskService.getTaskById(req.params.taskId, req.params.projectId)
        res.status(StatusCodes.OK).json(task)
    }

    updateTaskById = async (req: Request, res: Response) => {
        const task = await this.taskService.updateTaskById(req.params.taskId, req.params.projectId, req.body);
        res.status(StatusCodes.OK).json(task);
    }

    deleteTask = async (req: Request, res: Response) => {
        const deleted = await this.taskService.deleteTask(req.params.taskId, req.params.projectId);
        if (deleted) {
            res.status(StatusCodes.OK).json({ msg: 'Deleted' })
        } else {
            throw new CustomException()
        }
    }

    updateStatusById = async (req: Request, res: Response) => {

    }
}