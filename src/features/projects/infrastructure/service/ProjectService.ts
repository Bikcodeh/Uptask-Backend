import { inject, injectable } from 'inversify';
import { PROJECT_TYPES } from '../../domain/types';
import { IProjectRepository } from '../../domain/repository/ProjectRepository';
import { IProject } from '../../domain/interface';
import { CreatingException, DeleteException, NotFoundException } from '../../../../exception';

@injectable()
export class ProjectService {

    constructor(@inject(PROJECT_TYPES.ProjectRepository) private projectRepository: IProjectRepository) { }

    async getProjectById(projectId): Promise<IProject> {
        const project = await this.validateProjectExist(projectId);
        return project;
    }

    async createProject(data: IProject): Promise<IProject> {
        const project = await this.projectRepository.createProject(data);
        if (!project) throw new CreatingException();
        return project;
    }
    async getProjects(): Promise<IProject[]> {
        return await this.projectRepository.getProjects()
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