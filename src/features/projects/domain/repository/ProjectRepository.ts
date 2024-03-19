import { IProject } from "../interface";

export interface IProjectRepository {
    createProject(data: IProject): Promise<IProject | null>
    getProjects(): Promise<IProject[]>
    getProjectById(id: string): Promise<IProject>
    deleteProjectById(id: string): Promise<boolean>
    updateProject(id: string, data: IProject): Promise<IProject>
}