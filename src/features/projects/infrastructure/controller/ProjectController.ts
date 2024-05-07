import { inject, injectable } from "inversify";
import 'reflect-metadata';
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { PROJECT_TYPES } from '../../domain/types/index';
import { ProjectService } from "../service/ProjectService";
import { wrapResponse } from "../../../../common/response/apiResponse";

@injectable()
export class ProjectController {

   constructor(
      @inject(PROJECT_TYPES.ProjectService) private projectService: ProjectService
   ) { }

   getAllProjects = async (req: Request, res: Response) => {
      const projects = await this.projectService.getProjects(req.user.userId);
      return res.status(StatusCodes.OK).json(wrapResponse({ data: projects }))
   }

   createProject = async (req: Request, res: Response) => {
      const project = await this.projectService.createProject(req.body, req.user);
      return res.status(StatusCodes.CREATED).json(wrapResponse({ msg: 'Project created successfully', data: project })).send()
   }

   getProjectById = async (req: Request, res: Response) => {
      const project = await this.projectService.getProjectById(req.params.id, req.user.userId);
      return res.status(StatusCodes.OK).json(wrapResponse({ data: project }));
   }

   updateProjectById = async (req: Request, res: Response) => {
      const project = await this.projectService.updateProject(req.params.id, req.body, req.user.userId);
      return res.status(StatusCodes.OK).json(wrapResponse({ msg: 'Project updated successfully' ,data: project }));
   }

   deleteProjectById = async (req: Request, res: Response) => {
      await this.projectService.deleteProjectById(req.params.id, req.user.userId);
      return res.status(StatusCodes.OK).json(wrapResponse({ msg: 'Project deleted' }));
   }
}