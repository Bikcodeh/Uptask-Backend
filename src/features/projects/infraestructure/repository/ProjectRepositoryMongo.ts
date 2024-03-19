import { injectable } from 'inversify';
import colors from '@colors/colors';
import { IProject } from '../../domain/interface';
import { IProjectRepository } from './../../domain/repository/ProjectRepository';
import Project from '../../domain/model/Project';


@injectable()
export class ProjectRepositoryMongo implements IProjectRepository {

    constructor(){ }

    async getProjects(): Promise<IProject[]> {
        return await Project.find({});
    }

    async createProject  (data: IProject): Promise<IProject | null> {
        try {
            const project = new Project(data);
            await project.save();
            return project;
        } catch (error) {
            return null;
        }
    }
}