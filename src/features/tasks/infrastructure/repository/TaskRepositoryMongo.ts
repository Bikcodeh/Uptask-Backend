import { inject, injectable } from 'inversify';
import { ITaskRepository } from "../../domain/repository/TaskRepository";
import { ITask, ITaskDocument } from '../../domain/interface';
import { IProjectDocument, IProjectRepository, PROJECT_TYPES, Project, ProjectRepositoryMongo } from '../../../projects';
import { Task } from '../../domain/model/Task';
import { Document } from 'mongoose';
import { ForbiddenException, NotFoundException } from '../../../../exception';

@injectable()
export class TaskRepositoryMongo implements ITaskRepository {
    
    async deleteTaskById(taskId: string, projectId: string): Promise<boolean> {
        const task = await Task.findById(taskId)
        if (!task) throw new NotFoundException();
        if (task.project.toString() !== projectId) throw new ForbiddenException();
        const project = await Project.findById(projectId)
        if (!project) throw new NotFoundException();
        project.tasks = project.tasks.filter(t => t.toString() !== taskId)
        await project.save();
        await task.deleteOne()
        return true
    }

    async updateTaskById(taskId: string, projectId: string, data: ITask): Promise<ITask> {
        const task = await Task.findById(taskId)
        if (!task) throw new NotFoundException();
        if (task.project.toString() != projectId) throw new ForbiddenException();
        task.name = data.name;
        task.description = data.description;
        await task.save();
        return TaskRepositoryMongo.mapToITask(await task.populate('project'));
    }

    async getTaskById(taskId: string, projectId: string): Promise<ITask> {
        const task = await Task.findById(taskId);
        if (!task) throw new NotFoundException();
        if (task.project.toString() != projectId) throw new ForbiddenException();
        return TaskRepositoryMongo.mapToITask(await task.populate('project'));
    }


    async getProjectTasks(projectId: string): Promise<ITask[]> {
        const tasks = await Task.find({ project: projectId }).populate('project');
        return tasks.map(t => TaskRepositoryMongo.mapToITask(t))
    }

    createTask = async (data: ITask, projectId: string): Promise<ITask> => {
        const project = await Project.findById(projectId);
        if (!project) throw new NotFoundException();
        const task = new Task(data);
        project.tasks.push(task.id)
        task.project = project._id;
        await Promise.allSettled([task.save(), project.save()])
        return TaskRepositoryMongo.mapToITask(await task.populate('project'));
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