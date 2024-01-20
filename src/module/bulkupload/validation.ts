import joi, { ObjectSchema } from 'joi';
import IBulkUpload from './entities/IBulkUpload';

const bulkUploadValidation: ObjectSchema<IBulkUpload> = joi.object({
    status: joi.string().required(),
    endedAt: joi.date(),
    time: joi.number().integer().required(),
    filename: joi.string().required(),
    successfulEntries: joi.number().integer().required(),
    failedEntries: joi.number().integer().required(),
    entriesCompleted: joi.number().integer().required(),
    totalEntries: joi.number().integer().required(),
});

export default bulkUploadValidation;
