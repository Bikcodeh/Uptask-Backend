import { ITask } from "../../../tasks";
import { IProject } from "../interface";

export interface IProjectRepository {
    createProject(data: IProject): Promise<IProject | null>
    getProjects(): Promise<IProject[]>
    getProjectById(id: string): Promise<IProject | null>
    deleteProjectById(id: string): Promise<boolean>
    updateProject(id: string, data: IProject): Promise<IProject>
    addTask(projectId: string, task: ITask): Promise<boolean>
    deleteTask(projectId: String, taskId: string): Promise<boolean>
}