import { type Request, type Response } from 'express';
import { type ValidationResult } from 'joi';
import { userValidation } from '../module/user/validation';
import { SystemResponse } from '../lib/response-handler';
import logger from '../lib/logger';

class ValidationController {
    static paramValidation = async (req: Request, res: Response): Promise<void> => {
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
