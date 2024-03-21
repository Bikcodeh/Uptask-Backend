import { StatusCodes } from 'http-status-codes';
import { Request, Response, json } from 'express';
import { inject, injectable } from 'inversify';
import { ITaskRepository } from './../../domain/repository/TaskRepository';
import { TASK_TYPES } from '../../domain/types';
import { IProjectRepository, PROJECT_TYPES } from '../../../projects';

@injectable()
export class Taskcontroller {
    constructor(
        @inject(TASK_TYPES.TaskRepository) private taskRepository: ITaskRepository,
        @inject(PROJECT_TYPES.ProjectRepository) private projectRepository: IProjectRepository
    ) { }

    createTask = async (req: Request, res: Response) => {
        const task = await this.taskRepository.createTask(req.body, req.params.projectId);
        res.status(200).json({ msg: 'Task created', data: task }).send()
    }

    getProjectTasks = async (req: Request, res: Response) => {
        const tasks = await this.taskRepository.getProjectTasks(req.params.projectId);
        res.status(StatusCodes.OK).json(tasks);
    }

    getTasks = async (req: Request, res: Response) => {
        const task = await this.taskRepository.getTaskById(req.params.taskId, req.params.projectId)
        res.status(StatusCodes.OK).json(task)
    }

    updateTaskById = async (req: Request, res: Response) => {
        const task = await this.taskRepository.updateTaskById(req.params.taskId, req.params.projectId, req.body)
        res.status(StatusCodes.OK).json(task)
    }
}