import { Router } from "express";
import { handleInputErrors } from '../../../../common/middleware/validatorMiddleware';
import { body, param } from 'express-validator';

const taskRoutes = Router();

export { taskRoutes };