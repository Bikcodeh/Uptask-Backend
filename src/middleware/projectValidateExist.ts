import { NotFoundException } from './../exception/NotFoundException';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import container from '../config/di';
import { IProject, IProjectRepository, PROJECT_TYPES } from '../features/projects';

declare global {
    namespace Express {
        interface Request {
            project: IProject;
        }
    }
}

const projectRepository = container.get<IProjectRepository>(PROJECT_TYPES.ProjectRepository);

export async function projectValidateExist(req: Request, res: Response, next: NextFunction) {
    const project = await projectRepository.getProjectById(req.params.projectId);
    if (!project) {
        const error = new NotFoundException();
        return res.status(error.code).json({ error: error.message })
    }
    req.project = project;
    next()
}