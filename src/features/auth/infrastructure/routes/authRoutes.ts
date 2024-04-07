
import { Router } from "express";
import { container } from "../../../../config/di";
import { handleInputErrors } from '../../../../common/middleware/validatorMiddleware';
import { body, param } from 'express-validator';
import { AuthController } from "../controller/AuthController";

const authRoutes = Router();
const authController = container.resolve(AuthController);

authRoutes.post(
    '/create-account',
    body('name').notEmpty().withMessage('name is required'),
    body('password').isLength({ min: 8 }).withMessage('password is too short, at least 8 characters'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password does not match')
        }
        return true
    }),
    body('email').isEmail().withMessage('email is not valid'),
    handleInputErrors,
    authController.createAccount
);

export { authRoutes };