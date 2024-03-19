import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { PROJECT_TYPES } from './../../domain/types/index';
import { IProjectRepository } from '../../domain/repository/ProjectRepository';
import { StatusCodes } from "http-status-codes";
import { CreatingException, NotFoundException } from "../../../../exception";

@injectable()
export class ProjectController {

   constructor(
      @inject(PROJECT_TYPES.ProjectRepository)
      private projectRepository: IProjectRepository
   ) {

   }

   getAllProjects = async (req: Request, res: Response) => {
      const projects = await this.projectRepository.getProjects();
      res.json(projects)
   }

   createProject = async (req: Request, res: Response) => {
      const project = await this.projectRepository.createProject(req.body);
      if (project) {
         res.status(StatusCodes.CREATED).json(project).send()
      } else {
         throw new CreatingException();
      }
   }

   getProjectById = async (req: Request, res: Response) => {
      const project = await this.projectRepository.getProjectById(req.params.id);
      if (!project)throw new NotFoundException();
      res.status(StatusCodes.OK).json(project);
   }
}