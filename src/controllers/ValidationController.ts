import { type Request, type Response } from 'express';
import joi, { type ValidationResult, ObjectSchema } from 'joi';
import { SystemResponse } from '../lib/response-handler';
import logger from '../lib/logger';

class ValidationController {
    static paramValidation = async (req: Request, res: Response): Promise<void> => {
        const userValidation: ObjectSchema<any> = joi.object({
            name: joi.string().min(3).trim().required(),
            email: joi.string().email().required(),
            password: joi.string().custom((value, helper) => {
                if (value.length < 8) {
                    return helper.message({
                        custom: 'Password must be at least 8 characters long',
                    });
                }
                return value;
            }).required(),
            phoneNumber: joi.string().allow(''),
        });

        try {
            const validationResult: ValidationResult = userValidation.validate(
                req.body,
                {
                    abortEarly: false,
                },
            );

            if (validationResult.error) {
                new SystemResponse(
                    res,
                    'Validation error!',
                    validationResult.error,
                ).badRequest();
                return;
            }

            logger.info('Validation successful!');
            new SystemResponse(res, 'Validation successful!', req.body).ok();
        } catch (error) {
            logger.error('error in validation controller!', error);

            new SystemResponse(
                res,
                'Error occured in params validation',
                error,
            ).internalServerError();
        }
    };
}

export default ValidationController;
