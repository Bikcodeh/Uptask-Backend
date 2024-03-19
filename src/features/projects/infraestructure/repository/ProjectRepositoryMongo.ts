import mongoose, { Document } from 'mongoose';
import { injectable } from 'inversify';
import { IProject } from '../../domain/interface';
import { IProjectRepository } from './../../domain/repository/ProjectRepository';
import Project from '../../domain/model/Project';


@injectable()
export class ProjectRepositoryMongo implements IProjectRepository {

    async getProjectById(id: string): Promise<IProject> {
        const projectMongo = await Project.findById(new mongoose.Types.ObjectId(id));
        return this.mapProjectFromMongo(projectMongo);
    }

    async getProjects(): Promise<IProject[]> {
        return (await Project.find({})).map(p => this.mapProjectFromMongo(p));
    }

    async createProject(data: IProject): Promise<IProject | null> {
        try {
            const project = new Project(data);
            await project.save();
            return this.mapProjectFromMongo(project);
        } catch (error) {
            return null;
        }
    }

    private mapProjectFromMongo = (projectMongo: Document): IProject => {
        const { _id, __v, ...projectData } = projectMongo.toObject();
        const project = projectData as IProject;
        project.projectId = _id.toString();
        return project;
    };
}