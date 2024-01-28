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

    getByEmail = async (req: Request, res: Response): Promise<void> => {
        try {
            const user: IUser | null = await this.userService.getByEmail(
                req.params.emailId,
            );

            if (!user) {
                new SystemResponse(res, 'User not found!', req.params).notFound();
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

    deleteByEmail = async (req: Request, res: Response): Promise<void> => {
        try {
            const { emailId } = req.params;

            const result = await this.userService.deleteByEmail(emailId);

            if (result.deletedCount === 0) {
                logger.error(`User with email '${emailId}' doesn't exists!`);

                new SystemResponse(res, `User with email '${emailId}' doesn't exists!`, req.params).notFound();
                return;
            }

            logger.info('user deleted successfully!');
            new SystemResponse(res, 'user deleted successfully!', result).ok();
        } catch (error: unknown) {
            logger.info('error in deleteByEmail API', error);

            new SystemResponse(res, 'error deleting user!', error).internalServerError();
        }
    };

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const userList: IUser[] | null = await this.userService.getAll();
            new SystemResponse(res, 'users list found!', userList).ok();
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
                new SystemResponse(res, 'no user found for current email!', user).notFound();
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
                'error logging existing user!',
                error.message,
            ).internalServerError();
        }
    };
}

export default UserController;
