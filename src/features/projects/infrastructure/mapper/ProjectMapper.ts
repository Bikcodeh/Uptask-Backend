import { AuthMapper } from './../../../auth/infrastructure/mapper/AuthMapper';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { Document } from 'mongoose';
import { IProject, IProjectDocument } from '../../domain/interface';
import { ITaskDocument, TaskMapper } from '../../../tasks';
import { IUserDocument } from '../../../auth';

@injectable()
export class ProjectMapper {

    toIProject(
        projectMongo: IProjectDocument & Document,
        taskMapper: TaskMapper,
        authMapper: AuthMapper
    ): IProject {
        const { _id, __v, ...projectData } = projectMongo.toObject();
        const project = projectData as IProject;
        project.projectId = _id.toString();
        project.tasks = projectMongo.tasks.map(t => taskMapper.mapToITaskNoProject(t as ITaskDocument))
        project.manager = authMapper.toIUserSimple(projectMongo.manager as IUserDocument)
        return project;
    }

    toIProjectDocument(project: IProject | IProjectDocument): IProjectDocument {
        const projectMongo = project as IProjectDocument;
        return {
            _id: projectMongo._id ? projectMongo._id.toString() : project.projectId,
            projectName: projectMongo.projectName,
            description: projectMongo.description,
            clientName: projectMongo.clientName,
            tasks: project.tasks
        } as IProjectDocument;
    }
}