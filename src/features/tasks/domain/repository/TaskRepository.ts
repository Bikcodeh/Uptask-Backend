import { IProject } from "../../../projects";
import { ITask } from "../interface";

export interface ITaskRepository {
    createTask(data: ITask, project: IProject): Promise<ITask | null>
    getProjectTasks(projectId: string): Promise<ITask[]>
    getTaskById(taskId: string, projectId: string): Promise<ITask | null>
    updateTask(task: ITask, newData: ITask): Promise<ITask>
    deleteTask(task: ITask, projectId: string): Promise<boolean>
    updateStatusTaskById(taskId: string, projectId: string, status: string): Promise<ITask>
    getTask(taskId: string): Promise<ITask | null>
}