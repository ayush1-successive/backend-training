import { type Request, type Response } from 'express';
import { type ValidationResult } from 'joi';

import userData from '../lib/userData';
import IUser from '../module/user/entities/IUser';
import { userValidation } from '../module/user/validation';
import { SystemResponse } from '../lib/response-handler';

class UserController {
    static getData = (req: Request, res: Response): void => {
        new SystemResponse(res, 'user list found!', userData).ok();
    };

    static addUser = (req: Request, res: Response): void => {
        const newUser: IUser = req.body;
        userData.push(newUser);
        new SystemResponse(res, 'new user created!', newUser).created();
    };

    static addValidatedUser = (req: Request, res: Response): void => {
        const newUser: IUser = req.body;
        const validationResult: ValidationResult = userValidation.validate(
            newUser,
            {
                abortEarly: false,
            },
        );

        if (validationResult.error) {
            new SystemResponse(
                res,
                'new user validation failed!',
                validationResult.error,
            ).badRequest();
            return;
        }

        userData.push(newUser);
        new SystemResponse(res, 'new user created!', userData).created();
    };
}

export default UserController;
