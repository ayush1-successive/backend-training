import mongoose from 'mongoose';
import IBulkUpload from '../entities/IBulkUpload';

const bulkUploadSchema: mongoose.Schema<IBulkUpload> = new mongoose.Schema<IBulkUpload>(
    {
        status: { type: String, required: true },
        endedAt: { type: Date },
        time: { type: Number },
        filename: { type: String, required: true },
        successfulEntries: { type: Number, required: true },
        failedEntries: { type: Number, required: true },
        entriesCompleted: { type: Number, required: true },
        totalEntries: { type: Number },
        errorDetails: {
            message: { type: [String] },
            rowNumber: { type: Number },
        },
    },
    { timestamps: true },
);

export default bulkUploadSchema;
