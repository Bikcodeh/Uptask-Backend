import { ITask } from "../interface";

export interface ITaskRepository {
    createTask(data: ITask, projectId: string): Promise<ITask>
    getProjectTasks(projectId: string): Promise<ITask[]>
    getTaskById(taskId: string, projectId: string): Promise<ITask>
}