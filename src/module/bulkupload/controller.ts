import { Request, Response } from 'express';
import { ValidationResult } from 'joi';
import logger from '../../lib/logger';
import { SystemResponse } from '../../lib/response-handler';
import IBulkUpload from './entities/IBulkUpload';
import BulkUploadService from './service';
import bulkUploadValidation from './validation';

class BulkUploadController {
    private readonly bulkUploadService: BulkUploadService;

    constructor() {
        this.bulkUploadService = new BulkUploadService();
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const result: IBulkUpload[] | null = await this.bulkUploadService.getAll();

            new SystemResponse(res, 'upload history found!', result).ok();
        } catch (error: unknown) {
            logger.error('Error in getAll API', error);
            new SystemResponse(
                res,
                'Error retrieving bulk upload history!',
                error,
            ).internalServerError();
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { uploadId } = req.params;

            const fields = '-__v';
            const uploadHistory: IBulkUpload | null = await this.bulkUploadService.getById(
                uploadId,
                fields,
            );

            if (!uploadHistory) {
                new SystemResponse(
                    res,
                    'No upload history found for the provided ID!',
                    { uploadId },
                ).notFound();
                return;
            }

            new SystemResponse(
                res,
                'upload history found successfully.',
                uploadHistory,
            ).ok();
        } catch (error: unknown) {
            logger.error('error in getById', error);

            new SystemResponse(
                res,
                'Error retrieving upload history by jobId.',
                error,
            ).internalServerError();
        }
    };

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const newUploadData: IBulkUpload = req.body;
            const validationResult: ValidationResult = bulkUploadValidation.validate(
                newUploadData,
                { abortEarly: false },
            );

            if (validationResult.error) {
                new SystemResponse(
                    res,
                    'new bulk upload data validation failed!',
                    validationResult.error,
                ).badRequest();
                return;
            }

            const result: IBulkUpload | null = await this.bulkUploadService.create(
                newUploadData,
            );
            new SystemResponse(res, 'new upload history added!', result).created();
        } catch (error: unknown) {
            new SystemResponse(
                res,
                'error creating new bulk upload history!',
                error,
            ).internalServerError();
        }
    };
}

export default BulkUploadController;
