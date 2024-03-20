import { inject, injectable } from 'inversify';
import { ITaskRepository } from "../../domain/repository/TaskRepository";
import { ITask, ITaskDocument } from '../../domain/interface';
import { IProjectDocument, IProjectRepository, PROJECT_TYPES, ProjectRepositoryMongo } from '../../../projects';
import { Task } from '../../domain/model/Task';
import { Document } from 'mongoose';

@injectable()
export class TaskRepositoryMongo implements ITaskRepository {

    constructor(
        @inject(PROJECT_TYPES.ProjectRepository)
        private projectRepositoy: IProjectRepository
    ) { }


    async getProjectTasks(projectId: string): Promise<ITask[]> {
        const tasks = await Task.find({ project: projectId }).populate('project');
        return tasks.map(t => this.mapTaskFromMongo(t));
    }

    async createTask(data: ITask, projectId: string): Promise<ITask> {
        const project = await this.projectRepositoy.getProjectById(projectId) as IProjectDocument;
        const task = await new Task(data) as ITaskDocument;
        task.project = project.id;
        project.tasks.push(task.id);
        await task.save();
        await this.projectRepositoy.updateProject(projectId, project)
        return this.mapTaskFromMongo(task);
    }

    private mapTaskFromMongo = (taskMongo: Document): ITask => {
        const { _id, __v, ...taskData } = taskMongo.toObject();
        const task = taskData as ITask;
        task.taskId = _id.toString();
        task.project = ProjectRepositoryMongo.mapProjectFromMongo(
            (taskMongo as ITaskDocument).project as IProjectDocument
        )
        return task;
    };
}