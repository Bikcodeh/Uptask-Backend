import { Document } from "mongoose";

export interface IProject {
    projectId: string;
    projectName: string;
    clientName: string;
    description: string;
}

export interface IProjectDocument extends IProject, Document { }