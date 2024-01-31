import joi, { ValidationResult, type ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import IUser from './entities/IUser';
import { SystemResponse } from '../../lib/response-handler';
import logger from '../../lib/logger';

class UserValiation {
    static validate = (
        res: Response,
        next: NextFunction,
        validator: ObjectSchema<any>,
        value: any,
        failedMsg: string,
    ) => {
        try {
            const validationResult: ValidationResult<any> = validator.validate(
                value,
                { abortEarly: false },
            );
            if (validationResult.error) {
                new SystemResponse(res, failedMsg, validationResult.error).badRequest();
                return;
            }
            next();
        } catch (error: unknown) {
            logger.error(failedMsg, error);
            new SystemResponse(res, failedMsg, error).internalServerError();
        }
    };

    static id = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const idValidator: ObjectSchema<any> = joi.object({
            userId: joi.string().hex().length(24).required(),
        });

        UserValiation.validate(res, next, idValidator, req.params, 'userId validation failed!');
    };

    static email = (req: Request, res: Response, next: NextFunction) => {
        const emailValidator: ObjectSchema<any> = joi.object({
            emailId: joi
                .string()
                .email({ tlds: { allow: false } })
                .trim()
                .required(),
        });

        UserValiation.validate(res, next, emailValidator, req.params, 'email validation failed!');
    };

    static login = (req: Request, res: Response, next: NextFunction): void => {
        const loginValidator: ObjectSchema<any> = joi.object({
            email: joi
                .string()
                .email({ tlds: { allow: false } })
                .trim()
                .required(),
            password: joi
                .string()
                .custom((value, helper) => {
                    if (value.length < 8) {
                        return helper.message({
                            custom: 'Password must be at least 8 characters long',
                        });
                    }
                    return value;
                })
                .required(),
        });

        UserValiation.validate(res, next, loginValidator, req.body, 'login validation failed!');
    };

    static register = (req: Request, res: Response, next: NextFunction): void => {
        const registerValidator: ObjectSchema<any> = joi.object({
            name: joi.string().min(3).max(30).required(),
            email: joi
                .string()
                .email({ tlds: { allow: false } })
                .trim()
                .required(),
            password: joi
                .string()
                .custom((value, helper) => {
                    if (value.length < 8) {
                        return helper.message({
                            custom: 'Password must be at least 8 characters long',
                        });
                    }
                    return value;
                })
                .required(),
        });

        UserValiation.validate(res, next, registerValidator, req.body, 'new user validation failed!');
    };

    static update = (req: Request, res: Response, next: NextFunction): void => {
        const updateValidator: ObjectSchema<IUser> = joi.object({
            name: joi.string().min(3).max(30).trim()
                .required(),
            dateOfBirth: joi.date(),
            gender: joi.string(),
            phoneNumber: joi.string().allow(''),
            summary: joi.string().allow(''),
            skills: joi.array().items(joi.string()),
            domains: joi.array().items(joi.string()),
            achievements: joi.array().items(joi.string()),
            resume: joi.binary().max(1048576),
        });

        UserValiation.validate(res, next, updateValidator, req.body, 'updated user validation failed!');
    };
}

export default UserValiation;
