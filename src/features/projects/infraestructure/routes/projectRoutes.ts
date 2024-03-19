import { ProjectController } from '../controller/ProjectController';
import { Router } from "express";
import container from "../../../../config/di";

const router = Router();

const projectController = container.resolve(ProjectController);

router.get('/', projectController.getAllProjects);
router.post('/', projectController.createProject);

export default router;