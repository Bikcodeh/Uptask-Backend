import mongoose, { Document } from 'mongoose';
import { injectable } from 'inversify';
import { IProject } from '../../domain/interface';
import { IProjectRepository } from './../../domain/repository/ProjectRepository';
import Project from '../../domain/model/Project';
import { DeleteException, NotFoundException } from '../../../../exception';


@injectable()
export class ProjectRepositoryMongo implements IProjectRepository {

    async deleteProjectById(id: string): Promise<boolean> {
        const project = await Project.findById(new mongoose.Types.ObjectId(id));
        if (!project) throw new NotFoundException();
        await project.deleteOne()
        return true
    }

    async updateProject(id: string, data: IProject): Promise<IProject> {
        const project = await Project.findByIdAndUpdate(new mongoose.Types.ObjectId(id), { ...data }, { new: true })
        if (!project) throw new NotFoundException();
        return this.mapProjectFromMongo(project)
    }

    async getProjectById(id: string): Promise<IProject> {
        const projectMongo = await Project.findById(new mongoose.Types.ObjectId(id));
        if (!projectMongo) throw new NotFoundException();
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