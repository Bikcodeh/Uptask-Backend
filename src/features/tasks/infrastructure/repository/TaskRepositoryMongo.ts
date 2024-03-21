import { inject, injectable } from 'inversify';
import { ITaskRepository } from "../../domain/repository/TaskRepository";
import { ITask, ITaskDocument } from '../../domain/interface';
import { IProjectDocument, IProjectRepository, PROJECT_TYPES, Project, ProjectRepositoryMongo } from '../../../projects';
import { Task } from '../../domain/model/Task';
import { Document } from 'mongoose';
import { ForbiddenException, NotFoundException } from '../../../../exception';

@injectable()
export class TaskRepositoryMongo implements ITaskRepository {

    constructor(
        @inject(PROJECT_TYPES.ProjectRepository)
        private projectRepositoy: IProjectRepository
    ) { }

    async updateTaskById(taskId: string, projectId: string, data: ITask): Promise<ITask> {
        const task = await Task.findByIdAndUpdate(taskId, {...data}, { new: true})
        if (!task) throw new NotFoundException();
        if (task.project.toString() != projectId) throw new ForbiddenException();
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
        const task = new Task(data);
        project.tasks.push(task.id)
        task.project = project._id;
        await Promise.allSettled([task.save(), this.projectRepositoy.updateProject(projectId, project)])
        return this.mapTaskFromMongo(await task.populate('project'));
    }

    private mapTaskFromMongo = (taskMongo: Document & ITaskDocument): ITask => {
        const { _id, __v, ...taskData } = taskMongo.toObject();
        const task = taskData as ITask;
        task.taskId = _id.toString();
        task.project = ProjectRepositoryMongo.mapProjectFromMongo((taskMongo).project as IProjectDocument)
        return task;
    };

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