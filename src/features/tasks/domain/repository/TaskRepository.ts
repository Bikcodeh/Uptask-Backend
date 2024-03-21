import { ITask } from "../interface";

export interface ITaskRepository {
    createTask(data: ITask, projectId: string): Promise<ITask>
    getProjectTasks(projectId: string): Promise<ITask[]>
    getTaskById(taskId: string, projectId: string): Promise<ITask>
    updateTaskById(taskId: string, projectId: string, data: ITask): Promise<ITask>
    deleteTaskById(taskId: string, projectId: string): Promise<boolean>
}