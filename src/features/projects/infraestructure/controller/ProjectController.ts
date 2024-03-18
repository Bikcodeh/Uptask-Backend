import { Request, Response } from "express";
import { injectable } from "inversify";

@injectable()
export class ProjectController {
    static NAME: string = 'ProjectController';

    public getAllProjects = async (req: Request, res: Response) => {
       res.json({data: 'yeah'}).send()
    }
}