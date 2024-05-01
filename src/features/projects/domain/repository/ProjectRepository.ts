import { IUser } from "../../../auth";
import { ITask } from "../../../tasks";
import { IProject } from "../interface";

export interface IProjectRepository {
    createProject(data: IProject, user: IUser): Promise<IProject | null>
    getProjects(userId: string): Promise<IProject[]>
    getProjectById(id: string): Promise<IProject | null>
    deleteProjectById(id: string): Promise<boolean>
    updateProject(id: string, data: IProject): Promise<IProject>
    addTask(projectId: string, task: ITask): Promise<boolean>
    deleteTask(projectId: String, taskId: string): Promise<boolean>
}