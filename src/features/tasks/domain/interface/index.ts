import { Document } from "mongoose";
import { IProject } from "../../../projects";

export const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'
} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

export interface ITask {
    taskId: string;
    name: string;
    description: string;
    project: IProject;
    status: TaskStatus;
}

export interface ITaskDocument extends ITask, Document { }