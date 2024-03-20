import { Router } from "express";
import { handleInputErrors } from '../../../../middleware/validatorMiddleware';
import { body, param } from 'express-validator';

const taskRoutes = Router();

export { taskRoutes };