import { Request, Response } from 'express';
import { ValidationResult } from 'joi';
import { SystemResponse } from '../../lib/response-handler';

import IJobListing from './entities/IJobListing';
import JobService from './services';
import jobValidation from './validation';

class JobListingController {
    private readonly jobListingService: JobService;

    constructor() {
        this.jobListingService = new JobService();
    }

    static index = (req: Request, res: Response): void => {
        new SystemResponse(res, 'Job Listing HomePage', {}).ok();
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            // TODO: Assign type-check
            const { jobId } = req.params;

            const job: IJobListing | null = await this.jobListingService.getById(
                jobId,
            );

            if (!job) {
                new SystemResponse(
                    res,
                    'No job found for the provided ID!',
                    {},
                ).notFound();
                return;
            }

            new SystemResponse(res, 'Job found successfully.', job).ok();
        } catch (error: unknown) {
            // console.error(error);

            new SystemResponse(
                res,
                'Error retrieving job listing by jobId. Please try again later.',
                error,
            ).internalServerError();
        }
    };

    getByTitleAndCompany = async (req: Request, res: Response): Promise<void> => {
        try {
            const { title, company } = req.query;
            const job: IJobListing | null = await this.jobListingService.getByTitleAndCompany(
                title as string,
                company as string,
            );

            if (!job) {
                new SystemResponse(res, 'no joblisting found for title and company!', req.query).notFound();
                return;
            }

            new SystemResponse(res, 'job found successfully', job).ok();
        } catch (error: unknown) {
            new SystemResponse(res, 'internal server error', error).internalServerError();
        }
    };

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const jobList: IJobListing[] | null = await this.jobListingService.getAll();
            new SystemResponse(res, 'Job listing found!', jobList).ok();
        } catch (error: unknown) {
            new SystemResponse(
                res,
                'Error in job listing getAll API!',
                error,
            ).internalServerError();
        }
    };

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const newJobListing: IJobListing = req.body;
            const validationResult: ValidationResult = jobValidation.validate(
                newJobListing,
                { abortEarly: false },
            );

            if (validationResult.error) {
                new SystemResponse(
                    res,
                    'new job listing validation failed!',
                    validationResult.error,
                ).badRequest();
                return;
            }

            await this.jobListingService.create(newJobListing);
            new SystemResponse(res, 'new job added!', newJobListing).created();
        } catch (error: any) {
            new SystemResponse(
                res,
                'error creating new user!',
                error.message,
            ).internalServerError();
        }
    };

    uploadByFile = async (req: Request, res: Response): Promise<void> => {
        try {
            const filePath: string = req.file?.path ?? '';

            await this.jobListingService.writeBulkData(filePath);
            new SystemResponse(res, 'File uploaded successfully', req.file).created();
        } catch (error: unknown) {
            new SystemResponse(res, 'Internal Server Error!', error).badRequest();
        }
    };
}

export default JobListingController;
