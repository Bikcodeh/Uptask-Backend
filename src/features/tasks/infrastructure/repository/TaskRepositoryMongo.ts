import { inject, injectable } from 'inversify';
import { ITaskRepository } from "../../domain/repository/TaskRepository";
import { ITask } from '../../domain/interface';
import { IProject, IProjectRepository, PROJECT_TYPES, ProjectMapper } from '../../../projects';
import { Task } from '../../domain/model/Task';
import { TASK_TYPES } from '../../domain/types';
import { TaskMapper } from '../mapper/TaskMapper';

@injectable()
export class TaskRepositoryMongo implements ITaskRepository {

    constructor(
        @inject(PROJECT_TYPES.ProjectRepository) private projectRepository: IProjectRepository,
        @inject(TASK_TYPES.TaskMapper) private taskMapper: TaskMapper,
        @inject(PROJECT_TYPES.ProjectMapper) private projectMapper: ProjectMapper
    ) { }


    async getTask(taskId: string): Promise<ITask | null> {
        const task = await Task.findById(taskId);
        if (!task) return null;
        return this.taskMapper.mapToITaskWithProjectId(task);
    }

    async updateStatusTaskById(taskId: string, projectId: string, status: string): Promise<ITask> {
        return null
    }

    async deleteTask(task: ITask, projectId: string): Promise<boolean> {
        console.log(task, projectId)
        const taskDocument = await Task.findById(task.taskId);
        
        const deleted = await this.projectRepository.deleteTask(projectId, task.taskId);
        if (deleted) {
            await taskDocument.deleteOne()
            return true
        } else {
            return false
        }
    }

    async updateTask(task: ITask, newData: ITask): Promise<ITask> {
        const taskDocument = await Task.findById(task.taskId);
        taskDocument.name = newData.name;
        taskDocument.description = newData.description;
        await taskDocument.save();
        return this.taskMapper.mapToITaskWithProjectId(await taskDocument.populate('project'));
    }

    async getTaskById(taskId: string, projectId: string): Promise<ITask> {
        const task = await Task.findOne({ _id: taskId, project: projectId });
        if (!task) return null;
        return this.taskMapper.mapToITaskWithProjectId(await task.populate('project'));
    }

    async getProjectTasks(projectId: string): Promise<ITask[]> {
        const tasks = await Task.find({ project: projectId }).populate('project');
        return tasks.map(t => this.taskMapper.mapToITaskWithProjectId(t))
    }

    async createTask(data: ITask, project: IProject): Promise<ITask | null> {
        const task = new Task(data);
        task.project = this.projectMapper.toIProjectDocument(project);

        const added = await this.projectRepository.addTask(project.projectId, task);
        if (added) {
            const savedTask = await task.save();
            return this.taskMapper.mapToITaskWithProjectId(await savedTask.populate('project'));
        } else {
            return null;
        }
    }
}