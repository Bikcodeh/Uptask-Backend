import { handleInputErrors } from './../../../../middleware/validatorMiddleware';
import { Router } from "express";
import { body, param } from 'express-validator';
import { ProjectController } from '../controller/ProjectController';
import container from "../../../../config/di";

const router = Router();

const projectController = container.resolve(ProjectController);

router.get('/', projectController.getAllProjects);

router.get('/:id',
    param('id').isMongoId().withMessage('Invalid id'),
    handleInputErrors,
    projectController.getProjectById
);

router.post('/',
    body('projectName').notEmpty().withMessage('ProjectName is required'),
    body('clientName').notEmpty().withMessage('ClientName is required'),
    body('description').notEmpty().withMessage('Description is required'),
    handleInputErrors,
    projectController.createProject
);

router.put('/:id',
    param('id').isMongoId().withMessage('Invalid id'),
    body('projectName').notEmpty().withMessage('ProjectName is required'),
    body('clientName').notEmpty().withMessage('ClientName is required'),
    body('description').notEmpty().withMessage('Description is required'),
    handleInputErrors,
    projectController.updateProjectById
);

router.delete('/:id',
    param('id').isMongoId().withMessage('Invalid id'),
    handleInputErrors,
    projectController.deleteProjectById
);

export default router;