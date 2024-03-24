import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { PROJECT_TYPES } from '../../domain/types/index';
import { StatusCodes } from "http-status-codes";
import { DeleteException } from "../../../../exception";
import { ProjectService } from "../service/ProjectService";
import { wrapResponse } from "../../../../common/response/apiResponse";

@injectable()
export class ProjectController {

   constructor(
      @inject(PROJECT_TYPES.ProjectService) private projectService: ProjectService
   ) { }


   getAllProjects = async (req: Request, res: Response) => {
      const projects = await this.projectService.getProjects();
      res.status(StatusCodes.OK).json(wrapResponse({ data: projects }))
   }

   createProject = async (req: Request, res: Response) => {
      const project = await this.projectService.createProject(req.body);
      res.status(StatusCodes.CREATED).json(wrapResponse({ data: project })).send()
   }

   getProjectById = async (req: Request, res: Response) => {
      const project = await this.projectService.getProjectById(req.params.id);
      res.status(StatusCodes.OK).json(wrapResponse({ data: project }));
   }

   updateProjectById = async (req: Request, res: Response) => {
      const project = await this.projectService.updateProject(req.params.id, req.body);
      res.status(StatusCodes.OK).json(wrapResponse({ data: project }));
   }

   deleteProjectById = async (req: Request, res: Response) => {
      await this.projectService.deleteProjectById(req.params.id);
      res.status(StatusCodes.OK).json(wrapResponse({ msg: 'Project deleted' }));
   }
}