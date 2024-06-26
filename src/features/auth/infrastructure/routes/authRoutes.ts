
import { Router } from "express";
import { container } from "../../../../config/di";
import { handleInputErrors } from '../../../../common/middleware/validatorMiddleware';
import { body, param } from 'express-validator';
import { AuthController } from "../controller/AuthController";
import { authenticateMiddleware } from "../../../../common/middleware";

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

authRoutes.post(
    '/confirm-account',
    body('token').notEmpty().withMessage('Token is empty'),
    handleInputErrors,
    authController.confirmAccount
)

authRoutes.post(
    '/login',
    body('email').isEmail().notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('password is required'),
    handleInputErrors,
    authController.login
)

authRoutes.post(
    '/request-code',
    body('email').isEmail().notEmpty().withMessage('Email is required'),
    handleInputErrors,
    authController.requestCode
)

authRoutes.post(
    '/forgot-password',
    body('email').isEmail().notEmpty().withMessage('Email is required'),
    handleInputErrors,
    authController.forgotPassword
)

authRoutes.post(
    '/validate-token',
    body('token').notEmpty().withMessage('Token is empty'),
    handleInputErrors,
    authController.validateToken
)

authRoutes.post(
    '/update-password/:token',
    param('token').isNumeric().withMessage('Token no valid'),
    body('password').isLength({ min: 8 }).withMessage('password is too short, at least 8 characters'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password does not match')
        }
        return true
    }),
    handleInputErrors,
    authController.updatePasswordWithToken
)

authRoutes.get(
    '/user',
    authenticateMiddleware,
    authController.user
)

export { authRoutes };