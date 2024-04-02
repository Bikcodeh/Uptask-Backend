import { handleInputErrors } from '../../../../common/middleware/validatorMiddleware';
import { Router } from "express";
import { body, param } from 'express-validator';
import { ProjectController } from '../controller/ProjectController';
import container from "../../../../config/di";
import { Taskcontroller } from '../../../tasks';


const projectRoutes = Router();

const projectController = container.resolve(ProjectController);
const tasksController = container.resolve(Taskcontroller);

projectRoutes.get('/', projectController.getAllProjects);

projectRoutes.get('/:id',
    param('id').isMongoId().withMessage('Invalid id'),
    handleInputErrors,
    projectController.getProjectById
);

projectRoutes.post('/',
    body('projectName').notEmpty().withMessage('ProjectName is required'),
    body('clientName').notEmpty().withMessage('ClientName is required'),
    body('description').notEmpty().withMessage('Description is required'),
    handleInputErrors,
    projectController.createProject
);

projectRoutes.put('/:id',
    param('id').isMongoId().withMessage('Invalid id'),
    body('projectName').notEmpty().withMessage('ProjectName is required'),
    body('clientName').notEmpty().withMessage('ClientName is required'),
    body('description').notEmpty().withMessage('Description is required'),
    handleInputErrors,
    projectController.updateProjectById
);

projectRoutes.delete('/:id',
    param('id').isMongoId().withMessage('Invalid id'),
    handleInputErrors,
    projectController.deleteProjectById
);

projectRoutes.post('/:projectId/tasks',
    param('projectId').isMongoId().withMessage('Invalid id'),
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    handleInputErrors,
    tasksController.createTask
);

projectRoutes.get('/:projectId/tasks',
    param('projectId').isMongoId().withMessage('Invalid id'),
    handleInputErrors,
    tasksController.getProjectTasks
);

projectRoutes.get(
    '/:projectId/tasks/:taskId',
    param('projectId').isMongoId().withMessage('Invalid id'),
    param('taskId').isMongoId().withMessage('Invalid id'),
    handleInputErrors,
    tasksController.getTaskById
)

projectRoutes.put(
    '/:projectId/tasks/:taskId',
    param('projectId').isMongoId().withMessage('Invalid id'),
    param('taskId').isMongoId().withMessage('Invalid id'),
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    handleInputErrors,
    tasksController.updateTaskById
)

projectRoutes.delete(
    '/:projectId/tasks/:taskId',
    param('projectId').isMongoId().withMessage('Invalid id'),
    param('taskId').isMongoId().withMessage('Invalid id'),
    handleInputErrors,
    tasksController.deleteTask
)

projectRoutes.post(
    '/:projectId/tasks/:taskId/status',
    param('projectId').isMongoId().withMessage('Invalid id'),
    param('taskId').isMongoId().withMessage('Invalid id'),
    body('status').notEmpty().withMessage('status is required'),
    handleInputErrors,
    tasksController.updateStatusById
)

export { projectRoutes } 