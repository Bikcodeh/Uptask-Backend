import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { PROJECT_TYPES } from './../../domain/types/index';
import { IProjectRepository } from '../../domain/repository/ProjectRepository';
import { StatusCodes } from "http-status-codes";
import { CreatingException } from "../../../../exception";

@injectable()
export class ProjectController {

   constructor(
      @inject(PROJECT_TYPES.ProjectRepository)
      private projectRepository: IProjectRepository
   ) {

   }

   public getAllProjects = async (req: Request, res: Response) => {
      const projects = await this.projectRepository.getProjects();
      res.json(projects)
   }

   public createProject = async (req: Request, res: Response) => {
      const project = await this.projectRepository.createProject(req.body);
      if (project) {
         res.status(StatusCodes.CREATED).json(project).send()
      } else {
         throw new CreatingException();
      }
   }
}