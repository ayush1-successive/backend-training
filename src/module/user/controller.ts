import { Request, Response } from 'express';
import { ValidationResult } from 'joi';
import { serverConfig } from '../../config';
import { SystemResponse } from '../../lib/response-handler';

import IUser from './entities/IUser';
import IUserLoginRequest from './entities/IUserLoginRequest';
import UserService from './services';
import { userLoginRequestValidation, userValidation } from './validation';
import logger from '../../lib/logger';

class UserController {
    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    static index = (req: Request, res: Response): void => {
        new SystemResponse(res, 'User HomePage', {}).ok();
    };

    getByUserName = async (req: Request, res: Response): Promise<void> => {
        try {
            const user: IUser | null = await this.userService.getByUserName(
                req.params.username,
            );

            if (!user) {
                new SystemResponse(res, 'user not found!', {}).notFound();
                return;
            }

            new SystemResponse(res, 'user found!', user).ok();
        } catch (error: unknown) {
            logger.error('error in getByUserName API', error);

            new SystemResponse(
                res,
                'error retrieving user by username!',
                error,
            ).internalServerError();
        }
    };

    getByEmail = async (req: Request, res: Response): Promise<void> => {
        try {
            const user: IUser | null = await this.userService.getByEmail(
                req.params.email,
            );

            if (!user) {
                new SystemResponse(res, 'User not found!', {}).notFound();
                return;
            }

            new SystemResponse(res, 'User found!', user).ok();
        } catch (error: unknown) {
            logger.error('error in getByEmail API', error);

            new SystemResponse(
                res,
                'error retrieving user by email!',
                error,
            ).internalServerError();
        }
    };

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const userList: IUser[] | null = await this.userService.getAll();
            new SystemResponse(res, 'User found!', userList).ok();
        } catch (error: unknown) {
            logger.error('error in getAll API', error);

            new SystemResponse(
                res,
                'error retrieving all users!',
                error,
            ).internalServerError();
        }
    };

    register = async (req: Request, res: Response): Promise<void> => {
        try {
            const newUser: IUser = req.body;
            const validationResult: ValidationResult = userValidation.validate(
                newUser,
                { abortEarly: false },
            );

            if (validationResult.error) {
                new SystemResponse(
                    res,
                    'new user validation failed!',
                    validationResult.error,
                ).badRequest();
                return;
            }

            // Check for existing user
            const existingUser: IUser | null = await this.userService.getByEmail(
                newUser.email,
            );

            if (existingUser) {
                new SystemResponse(res, 'User already exists!', newUser).badRequest();
                return;
            }

            await this.userService.create(newUser);
            new SystemResponse(res, 'new user added!', newUser).created();
        } catch (error: any) {
            logger.error('error in register API', error);

            new SystemResponse(
                res,
                'error creating new user!',
                error.message,
            ).internalServerError();
        }
    };

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const user: IUserLoginRequest = req.body;

            const validationResult: ValidationResult = userLoginRequestValidation.validate(
                user,
                { abortEarly: false },
            );

            if (validationResult.error) {
                new SystemResponse(
                    res,
                    'new user validation failed!',
                    validationResult.error.message,
                ).badRequest();
                return;
            }

            // User exist check
            const existingUser: IUser | null = await this.userService.getByEmail(user.email);

            if (!existingUser) {
                new SystemResponse(res, 'no user found for current email!', user).badRequest();
                return;
            }

            // Correct password check
            const comparePassword = await UserService.verifyPassword(existingUser, user);
            if (!comparePassword) {
                new SystemResponse(res, 'Invalid credentials!', user).unauthorized();
                return;
            }

            const token: string = await UserService.generateLoginToken(
                existingUser,
                serverConfig.jwtSecret,
            );

            new SystemResponse(res, 'user login successfully!', { token, existingUser }).ok();
        } catch (error: any) {
            new SystemResponse(
                res,
                'error loging existing user!',
                error.message,
            ).internalServerError();
        }
    };

    deleteAll = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.userService.deleteAll();
            new SystemResponse(res, 'user list deleted!', {}).ok();
        } catch (error: unknown) {
            new SystemResponse(
                res,
                'error deleting all users!',
                error,
            ).internalServerError();
        }
    };
}

export default UserController;
