import { inject, injectable } from 'inversify';
import { IProjectDocument } from './../../domain/interface/index';
import { IProject } from '../../domain/interface';
import { IProjectRepository } from '../../domain/repository/ProjectRepository';
import { Project } from '../../domain/model/Project';
import { PROJECT_TYPES } from '../../domain/types';
import { ProjectMapper } from '../mapper/ProjectMapper';
import { ITask, TASK_TYPES, TaskMapper } from '../../../tasks';
import mongoose from 'mongoose';

@injectable()
export class ProjectRepositoryMongo implements IProjectRepository {

    constructor(
        @inject(PROJECT_TYPES.ProjectMapper)
        private projectMapper: ProjectMapper,
        @inject(TASK_TYPES.TaskMapper)
        private taskMapper: TaskMapper
    ) { }


    async deleteTask(projectId: String, taskId: string): Promise<boolean> {
        const project = await Project.findById(projectId);
        project.tasks = project.tasks.filter(t => t.toString() !== taskId);
        await project.save();
        return true;
    }

    async addTask(projectId: string, task: ITask): Promise<boolean> {
        const project = await Project.findById(new mongoose.Types.ObjectId(projectId));
        if (!project) return false;
        project.tasks.push(task);
        await project.save()
        return true
    }

    async deleteProjectById(id: string): Promise<boolean> {
        const project = await Project.findById(id);
        await project.deleteOne()
        return true
    }

    async updateProject(id: string, data: IProject): Promise<IProject> {
        const project = await Project.findOneAndUpdate({ _id: id }, { ...data }, { new: true });
        return this.projectMapper.toIProject(await project.populate('tasks'), this.taskMapper);
    }

    async getProjectById(id: string): Promise<IProject | null> {
        const project = await Project.findOne({ _id: id });
        console.log(project)
        if (!project) return null;
        return this.projectMapper.toIProject(await project.populate('tasks'), this.taskMapper);
    }

    async getProjects(): Promise<IProject[]> {
        const projects = await Project.find({}).populate('tasks');
        return projects.map(p => this.projectMapper.toIProject(p, this.taskMapper));
    }

    async createProject(data: IProject): Promise<IProject | null> {
        try {
            const project = new Project(data);
            const saved = await project.save();
            return this.projectMapper.toIProject(saved, this.taskMapper);
        } catch (error) {
            return null;
        }
    }
}