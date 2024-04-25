import { IUser } from '../../../auth';
import { ITask } from './../../../tasks/domain/interface/index';
import { Document } from "mongoose";

export interface IProject {
    projectId?: string;
    projectName?: string;
    clientName?: string;
    description?: string;
    tasks?: ITask[];
    manager: IUser;
}

export interface IProjectDocument extends IProject, Document { }