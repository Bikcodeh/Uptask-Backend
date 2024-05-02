import { ForbiddenException } from './../../../../common/exception/ForbiddenException';
import { IUser } from './../../../auth/domain/interface/index';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { PROJECT_TYPES } from '../../domain/types';
import { IProjectRepository } from '../../domain/repository/ProjectRepository';
import { IProject } from '../../domain/interface';
import { CreatingException, DeleteException, NotFoundException } from '../../../../common/exception';

@injectable()
export class ProjectService {

    constructor(
        @inject(PROJECT_TYPES.ProjectRepository) private projectRepository: IProjectRepository
    ) { }

    async getProjectById(projectId, userId: string): Promise<IProject> {
        const project = await this.validateProjectExist(projectId);
        console.log(project.manager.userId)
        console.log(userId)
        if (project.manager.userId !== userId) {
            throw new ForbiddenException()
        }
        return project;
    }

    async createProject(data: IProject, user: IUser): Promise<IProject> {
        const project = await this.projectRepository.createProject(data, user);
        if (!project) throw new CreatingException();
        return project;
    }
    async getProjects(userId: string): Promise<IProject[]> {
        return await this.projectRepository.getProjects(userId)
    }

    async deleteProjectById(id: string): Promise<void> {
        await this.validateProjectExist(id)
        const deleted = await this.projectRepository.deleteProjectById(id);
        if (!deleted) {
            throw new DeleteException();
        }
    }

    async updateProject(id: string, data: IProject): Promise<IProject> {
        await this.validateProjectExist(id)
        const project = await this.projectRepository.updateProject(id, data);
        return project;
    }

    async validateProjectExist(projectId: string): Promise<IProject> {
        const project = await this.projectRepository.getProjectById(projectId);
        if (!project) throw new NotFoundException('Project not found');
        return project;
    }
}