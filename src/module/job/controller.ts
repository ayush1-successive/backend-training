import { Request, Response } from 'express';
import { ValidationResult } from 'joi';
import { SystemResponse } from '../../lib/response-handler';

import IJobListing from './entities/IJobListing';
import JobService from './services';
import jobValidation from './validation';
import logger from '../../lib/logger';

class JobListingController {
    private readonly jobListingService: JobService;

    constructor() {
        this.jobListingService = new JobService();
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            // QUERY FILTER
            let queryObj = { ...req.query };
            const excludedFields = ['page', 'sort', 'limit', 'fields'];
            excludedFields.forEach((el) => delete queryObj[el]);

            // gt, lt manipulation
            let queryStr = JSON.stringify(queryObj);
            queryStr = queryStr.replace(
                /\b(gte|lte|gt|lt)\b/g,
                (match) => `$${match}`,
            );

            queryObj = JSON.parse(queryStr);
            let query = this.jobListingService.jobRepository.model.find(queryObj);

            // SORT
            const sortBy = req.query.sort
                ? (req.query.sort as string).split(',').join(' ')
                : '-createdAt';
            query = query.sort(sortBy);

            // FIELD LIMITING
            const fields = req.query.fields
                ? (req.query.fields as string).split(',').join(' ')
                : '-__v';
            query = query.select(fields);

            // PAGINATION
            const total = await this.jobListingService.jobRepository.model.countDocuments(
                queryObj,
            );
            const page = parseInt((req.query.page as string) ?? '1', 10);
            const limit = parseInt((req.query.limit as string) ?? '10', 10);
            const skip = (page - 1) * limit;

            if (skip >= total) {
                logger.error('error in getAll API');
                new SystemResponse(
                    res,
                    'This page doesn\'t exist!',
                    req.query,
                ).badRequest();
                return;
            }

            query = query.skip(skip).limit(limit);

            const jobs: IJobListing[] | null = await query;

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
                'error creating new job listing!',
                error,
            ).internalServerError();
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { jobId } = req.params;

            const job: IJobListing | null = await this.jobListingService.getById(
                jobId,
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

            await this.jobListingService.writeBulkData(filePath);
            new SystemResponse(res, 'File uploaded successfully', req.file).created();
        } catch (error: unknown) {
            new SystemResponse(res, 'Internal Server Error!', error).badRequest();
        }
    };
}

export default JobListingController;
