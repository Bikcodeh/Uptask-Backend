import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TASK_TYPES } from '../../domain/types';
import { TaskService } from '../service/TaskService';
import { wrapResponse } from '../../../../common/response/apiResponse';

@injectable()
export class Taskcontroller {
    constructor(
        @inject(TASK_TYPES.TaskService) private taskService: TaskService
    ) { }

    createTask = async (req: Request, res: Response) => {
        const task = await this.taskService.createTask(req.body, req.params.projectId);
        res.status(StatusCodes.OK).json(wrapResponse({ msg: 'Task created', data: task })).send()
    }

    getProjectTasks = async (req: Request, res: Response) => {
        const tasks = await this.taskService.getProjectTasks(req.params.projectId);
        res.status(StatusCodes.OK).json(wrapResponse({ data: tasks }));
    }

    getTaskById = async (req: Request, res: Response) => {
        const task = await this.taskService.getTaskById(req.params.taskId, req.params.projectId)
        res.status(StatusCodes.OK).json(wrapResponse({ data: task }))
    }

    updateTaskById = async (req: Request, res: Response) => {
        const task = await this.taskService.updateTaskById(req.params.taskId, req.params.projectId, req.body);
        res.status(StatusCodes.OK).json(wrapResponse({msg:'Task updated successfully', data: task}));
    }

    deleteTask = async (req: Request, res: Response) => {
        await this.taskService.deleteTask(req.params.taskId, req.params.projectId);
        res.status(StatusCodes.OK).json(wrapResponse({ msg: 'Task Deleted' }));
    }

    updateStatusById = async (req: Request, res: Response) => {
        const task = await this.taskService.updateStatusTaskById(
            req.params.taskId,
            req.params.projectId,
            req.params.status
        );
        res.status(StatusCodes.OK).json(wrapResponse({ success: true, data: task }))
    }
}