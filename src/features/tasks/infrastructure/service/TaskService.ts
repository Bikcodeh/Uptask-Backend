import { inject, injectable } from 'inversify';
import { TASK_TYPES } from '../../domain/types';
import { ITaskRepository } from '../../domain/repository/TaskRepository';
import { ITask } from '../../domain/interface';
import { NotFoundException, ForbiddenException, CreatingException, DeleteException } from '../../../../common/exception';
import { ProjectService } from '../../../projects/infrastructure/service/ProjectService';
import { PROJECT_TYPES } from '../../../projects/domain/types';

@injectable()
export class TaskService {

    constructor(
        @inject(PROJECT_TYPES.ProjectService) private projectService: ProjectService,
        @inject(TASK_TYPES.TaskRepository) private taskRepository: ITaskRepository
    ) { }

   createTask = async (data: ITask, projectId: string): Promise<ITask> => {
        const project = await this.projectService.validateProjectExist(projectId);
        const task = await this.taskRepository.createTask(data, project);
        if (!task) throw new CreatingException();
        return task;
    }

    getProjectTasks = async (projectId: string): Promise<ITask[]> => {
        await this.projectService.validateProjectExist(projectId)
        return await this.taskRepository.getProjectTasks(projectId);
    }

     getTaskById = async (taskId: string, projectId: string): Promise<ITask> => {
        const task = await this.taskRepository.getTaskById(taskId, projectId);
        if (!task) throw new NotFoundException('Task not found');
        return task;
    }

    updateTaskById = async (taskId: string, projectId: string, data: ITask): Promise<ITask> => {
        const task = await this.validateTaskExist(taskId, projectId);
        return await this.taskRepository.updateTask(task, data);
    }

    deleteTask = async (taskId: string, projectId: string): Promise<void> => {
        await this.validateTaskExist(taskId, projectId);
        await this.projectService.validateProjectExist(projectId);
        const task = await this.validateProjectBelongs(taskId, projectId);
        const deleted = await this.taskRepository.deleteTask(task, projectId);
        if (!deleted) {
            throw new DeleteException();
        }

    }

    updateStatusTaskById = async (taskId: string, projectId: string, status: string): Promise<ITask> => {
       return null;
    }

    private async validateTaskExist(taskId: string, projectId: string): Promise<ITask> {
        const task = await this.taskRepository.getTaskById(taskId, projectId);
        if (!task) throw new NotFoundException('Task not found');
        return task;
    }

    private async validateProjectBelongs(taskId: string, projectId: string): Promise<ITask> {
        const task = await this.taskRepository.getTask(taskId);
        if (!task) throw new NotFoundException('Task not found');
        if (task.project.toString() != projectId) throw new ForbiddenException();
        return task;
    }
}