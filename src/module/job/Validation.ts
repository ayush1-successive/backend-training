import joi, { ObjectSchema, ValidationResult } from 'joi';
import { NextFunction, Request, Response } from 'express';
import IJobListing from './entities/IJobListing';
import { SystemResponse } from '../../lib/response-handler';
import logger from '../../lib/logger';

export const jobValidation: ObjectSchema<IJobListing> = joi.object({
    title: joi.string().required(),
    company: joi.string().required(),
    logo: joi.string(),
    address: joi.object(),
    jobType: joi.string().required(),
    industry: joi.string().required(),
    description: joi.string(),
    requirements: joi.array(),
    responsibilities: joi.array(),
    qualifications: joi.object(),
    salary: joi.number().integer(),
    applicationDeadline: joi.date().required(),
    isRemote: joi.boolean().required(),
    contactEmail: joi
        .string()
        .email({ tlds: { allow: false } })
        .trim()
        .required(),
    applicationLink: joi.string().required(),
});

class JobListingValidation {
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

    static id = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const idValidator: ObjectSchema<any> = joi.object({
            jobId: joi.string().hex().length(24).required(),
        });

        JobListingValidation.validate(res, next, idValidator, req.params, 'jobId validation failed!');
    };

    static create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        JobListingValidation.validate(res, next, jobValidation, req.body, 'new job listing validation failed!');
    };
}

export default JobListingValidation;
