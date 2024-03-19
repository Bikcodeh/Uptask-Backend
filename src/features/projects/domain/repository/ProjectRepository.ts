import { IProject } from "../interface";

export interface IProjectRepository {
    createProject(data: IProject): Promise<IProject | null>
}