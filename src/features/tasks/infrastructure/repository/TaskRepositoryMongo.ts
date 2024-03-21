import { injectable } from 'inversify';
import { ITaskRepository } from "../../domain/repository/TaskRepository";
import { ITask, ITaskDocument } from '../../domain/interface';
import { IProjectDocument, ProjectRepositoryMongo, Project } from '../../../projects';
import { Task } from '../../domain/model/Task';
import { Document } from 'mongoose';
import { ForbiddenException, NotFoundException } from '../../../../exception';

@injectable()
export class TaskRepositoryMongo implements ITaskRepository {

    async updateStatusTaskById(taskId: string, projectId: string, status: string): Promise<ITask> {
        return null
    }

    async deleteTaskById(taskId: string, projectId: string): Promise<boolean> {
        const task = await this.validateTask(taskId, projectId);
        const project = await ProjectRepositoryMongo.validateProject(projectId);
        project.tasks = project.tasks.filter(t => t.toString() !== taskId)
        await Promise.allSettled([project.save(), task.deleteOne()])
        return true
    }

    async updateTaskById(taskId: string, projectId: string, data: ITask): Promise<ITask> {
        const task = await this.validateTask(taskId, projectId);
        task.name = data.name;
        task.description = data.description;
        await task.save();
        return TaskRepositoryMongo.mapToITask(await task.populate('project'));
    }

    async getTaskById(taskId: string, projectId: string): Promise<ITask> {
        const task = await this.validateTask(taskId, projectId);
        return TaskRepositoryMongo.mapToITask(await task.populate('project'));
    }


    async getProjectTasks(projectId: string): Promise<ITask[]> {
        await ProjectRepositoryMongo.validateProject(projectId);
        const tasks = await Task.find({ project: projectId }).populate('project');
        return tasks.map(t => TaskRepositoryMongo.mapToITask(t))
    }

    createTask = async (data: ITask, projectId: string): Promise<ITask> => {
        const project = await ProjectRepositoryMongo.validateProject(projectId);
        const task = new Task(data);
        project.tasks.push(task.id)
        task.project = project._id;
        await Promise.allSettled([task.save(), project.save()])
        return TaskRepositoryMongo.mapToITask(await task.populate('project'));
    }

    private async validateTask(taskId: string, projectId?: string): Promise<ITaskDocument> {
        const task = await Task.findById(taskId);
        if (!task) throw new NotFoundException('Task not found');
        if (projectId) {
            if (task.project.toString() != projectId) throw new ForbiddenException();
        }
        return task
    }

    static mapToITask (taskDocument: Document & ITaskDocument): ITask {
        const { _id, __v, ...taskData } = taskDocument.toObject();
        const task = taskData as ITask;
        task.taskId = _id.toString();
        task.project = ProjectRepositoryMongo.mapToIProject(taskDocument.project as IProjectDocument)
        return task;
    }

    static mapToITaskNoProject (taskDocument: Document & ITaskDocument): ITask {
        const { _id, __v, project, ...taskData } = taskDocument.toObject();
        const task = taskData as ITask;
        task.taskId = _id.toString();
        return task;
    }

}