import { handleInputErrors } from './../../../../middleware/validatorMiddleware';
import { Router } from "express";
import { body } from 'express-validator';
import { ProjectController } from '../controller/ProjectController';
import container from "../../../../config/di";

const router = Router();

const projectController = container.resolve(ProjectController);

router.get('/', projectController.getAllProjects);
router.post('/',
    body('projectName').notEmpty().withMessage('ProjectName is required'),
    body('clientName').notEmpty().withMessage('ClientName is required'),
    body('description').notEmpty().withMessage('Description is required'),
    handleInputErrors,
    projectController.createProject
);

export default router;