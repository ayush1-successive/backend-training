import { Request, Response } from 'express';
import { ValidationResult } from 'joi';
import logger from '../../lib/logger';

import { SystemResponse } from '../../lib/response-handler';
import IJobListing from './entities/IJobListing';
import JobService from './services';
import jobValidation from './validation';

class JobListingController {
    private readonly jobListingService: JobService;

    constructor() {
        this.jobListingService = new JobService();
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const filters = await JobService.getFilters(req.query);
            const total: number = await this.jobListingService.countDocuments(
                filters,
            );

            // PAGINATION
            const page: number = parseInt((req.query.page as string) ?? '1', 10);
            const limit: number = parseInt((req.query.limit as string) ?? '10', 10);
            const skip: number = (page - 1) * limit;

            if (skip >= total && total > 0) {
                logger.error('error in getAll API');
                new SystemResponse(res, 'This page doesn\'t exist!', {
                    total,
                    ...req.query,
                }).badRequest();
                return;
            }

            const jobs: IJobListing[] | null = await this.jobListingService.getAll(
                req.query,
                filters,
                page,
                limit,
            );

            new SystemResponse(res, 'Job listing found!', {
                total,
                count: jobs?.length,
                data: jobs,
            }).ok();
        } catch (error: unknown) {
            logger.error('error in getAll API', error);
            new SystemResponse(
                res,
                'Error retrieving job listings!',
                error,
            ).internalServerError();
        }
    };

    countAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const total = await this.jobListingService.countDocuments({});
            new SystemResponse(res, 'Job listing count!', { count: total }).ok();
        } catch (error: unknown) {
            logger.error('error in countAll API', error);
            new SystemResponse(
                res,
                'Error retrieving job listings count!',
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

            const result: IJobListing = await this.jobListingService.create(newJobListing);
            new SystemResponse(res, 'new job added!', result).created();
        } catch (error: any) {
            new SystemResponse(
                res,
                'error creating new job listing!',
                error,
            ).internalServerError();
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { jobId } = req.params;

            const fields = '-__v';
            const job: IJobListing | null = await this.jobListingService.getById(
                jobId,
                fields,
            );

            if (!job) {
                new SystemResponse(res, 'No job found for the provided ID!', {
                    jobId,
                }).notFound();
                return;
            }

            new SystemResponse(res, 'Job found successfully.', job).ok();
        } catch (error: unknown) {
            logger.error('error in getById', error);

            new SystemResponse(
                res,
                'Error retrieving job listing by jobId.',
                error,
            ).internalServerError();
        }
    };

    updateById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { jobId } = req.params;
            const updatedJobListing: IJobListing = req.body;

            const validationResult: ValidationResult = jobValidation.validate(
                updatedJobListing,
                { abortEarly: false },
            );

            if (validationResult.error) {
                new SystemResponse(
                    res,
                    'updated job listing validation failed!',
                    validationResult.error,
                ).badRequest();
                return;
            }

            await this.jobListingService.updateById(jobId, updatedJobListing);
            new SystemResponse(
                res,
                `job with id:${jobId} updated!`,
                updatedJobListing,
            ).ok();
        } catch (error: any) {
            new SystemResponse(
                res,
                'error updating job listing!',
                error,
            ).internalServerError();
        }
    };

    deleteById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { jobId } = req.params;
            await this.jobListingService.deleteById(jobId);

            logger.info(`joblisting with id:${jobId} deleted!`);

            new SystemResponse(res, 'Job deleted successfully!', {
                jobId,
            }).ok();
        } catch (error: unknown) {
            logger.error('error in deleteById API', error);

            new SystemResponse(
                res,
                'Error deleting joblisting by id!',
                error,
            ).internalServerError();
        }
    };

    uploadByFile = async (req: Request, res: Response): Promise<void> => {
        try {
            const filePath: string = req.file?.path ?? '';
            const filename: string = req.file?.originalname ?? '';

            await this.jobListingService.writeBulkData(filename, filePath);
            new SystemResponse(res, 'File uploaded successfully', req.file).created();
        } catch (error: unknown) {
            new SystemResponse(
                res,
                'Internal Server Error!',
                error,
            ).internalServerError();
        }
    };
}

export default JobListingController;
