import IBulkUpload from './entities/IBulkUpload';
import BulkUploadRepository from './repositories/repository';

class BulkUploadService {
    bulkUploadRepository: BulkUploadRepository;

    constructor() {
        this.bulkUploadRepository = new BulkUploadRepository();
    }

    getAll = async (): Promise<IBulkUpload[] | null> => {
        const fields = '_id filename status entriesCompleted totalEntries time';

        let query = this.bulkUploadRepository.model.find();
        query = query.select(fields);

        // SORT
        const sortBy = '-createdAt';
        query = query.sort(sortBy);

        const result: IBulkUpload[] | null = await query;
        return result;
    };

    getById = async (uploadId: string, fields: string): Promise<IBulkUpload | null> => {
        const result: IBulkUpload | null = await this.bulkUploadRepository.getById(
            uploadId,
            fields,
        );
        return result;
    };

    updateById = async (uploadId: string, newData: IBulkUpload): Promise<IBulkUpload | null> => {
        const result: IBulkUpload | null = await this.bulkUploadRepository.update(
            uploadId,
            newData,
        );
        return result;
    };

    create = async (uploadData: IBulkUpload): Promise<IBulkUpload> => {
        const result = await this.bulkUploadRepository.createOne(uploadData);
        return result;
    };

    generateHollowEntry = async (filename: string) : Promise<IBulkUpload> => {
        const hollowData:IBulkUpload = {
            status: 'running',
            time: 0,
            filename,
            successfulEntries: 0,
            failedEntries: 0,
            entriesCompleted: 0,
            totalEntries: 0,
        };

        const result: IBulkUpload = await this.create(hollowData);
        return result;
    };
}

export default BulkUploadService;
