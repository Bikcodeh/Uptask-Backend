import { inject, injectable } from "inversify";
import 'reflect-metadata';
import { Document } from "mongoose";
import { ITaskDocument, ITask } from "../../domain/interface";
import { IProject, IProjectDocument, PROJECT_TYPES, ProjectMapper } from "../../../projects";

@injectable()
export class TaskMapper {

    constructor(
        @inject(PROJECT_TYPES.ProjectMapper)
        private projectMapper: ProjectMapper
    ) { }

    mapToITask(taskDocument: Document & ITaskDocument): ITask {
        const { _id, __v, project, ...taskData } = taskDocument;
        const task = {
            taskId: taskData.id,
            name: taskDocument.name,
            description: taskDocument.description,
            createdAt: taskDocument.createdAt,
            updatedAt: taskDocument.updatedAt,
            status: taskDocument.status
        } as ITask;
        task.project = this.projectMapper.toIProject(taskDocument.project as IProjectDocument, this);
        return task;
    }

    mapToITaskWithProjectId(taskDocument: Document & ITaskDocument): ITask {
        const task = {
            taskId: taskDocument._id.toString(),
            name: taskDocument.name,
            description: taskDocument.description,
            createdAt: taskDocument.createdAt,
            updatedAt: taskDocument.updatedAt,
            status: taskDocument.status
        } as ITask;
        task.project = { projectId: this.projectMapper.toIProjectDocument(taskDocument.project)._id.toString() } as IProject;
        return task;
    }

    mapToITaskNoProject(taskDocument: Document & ITaskDocument): ITask {
        const task = {
            taskId: taskDocument._id.toString(),
            name: taskDocument.name,
            description: taskDocument.description,
            createdAt: taskDocument.createdAt,
            updatedAt: taskDocument.updatedAt,
            status: taskDocument.status
        } as ITask;
        return task;
    }
}