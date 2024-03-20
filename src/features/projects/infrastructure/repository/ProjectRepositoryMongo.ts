import { ITask, ITaskDocument } from './../../../tasks/domain/interface/index';
import { IProjectDocument } from './../../domain/interface/index';
import mongoose, { Document } from 'mongoose';
import { injectable } from 'inversify';
import { IProject } from '../../domain/interface';
import { IProjectRepository } from '../../domain/repository/ProjectRepository';
import { NotFoundException } from '../../../../exception';
import { Project } from '../../domain/model/Project';
import { Task, TaskRepositoryMongo } from '../../../tasks';


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
        return ProjectRepositoryMongo.mapProjectFromMongo(await project.populate('tasks'))
    }

    async getProjectById(id: string): Promise<IProject> {
        const projectMongo = await Project.findById(id).populate('tasks');
        if (!projectMongo) throw new NotFoundException();
        return ProjectRepositoryMongo.mapProjectFromMongo(projectMongo);
    }

    async getProjects(): Promise<IProject[]> {
        const projects = await Project.find({}).populate('tasks');
        return projects.map(p => ProjectRepositoryMongo.mapProjectFromMongo(p));
    }

    async createProject(data: IProject): Promise<IProject | null> {
        try {
            const project = new Project(data);
            await project.save();
            return ProjectRepositoryMongo.mapProjectFromMongo(project);
        } catch (error) {
            return null;
        }
    }

    static mapProjectFromMongo = (projectMongo: Document & IProjectDocument): IProject => {
        const { _id, __v, ...projectData } = projectMongo.toObject();
        const project = projectData as IProject;
        project.projectId = _id.toString();
        project.tasks = projectMongo.tasks.map(t => TaskRepositoryMongo.mapToITaskNoProject(t as ITaskDocument))
        return project;
    };

    static mapToIProject(projectDocument: Document & IProjectDocument) {
        const { _id, __v, tasks, ...projectData } = projectDocument.toObject();
        const project = projectData as IProject;
        project.projectId = _id.toString();
        return project;
    }
}