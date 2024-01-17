import { BaseRepository } from '../../../lib/base';
import IBulkUpload from '../entities/IBulkUpload';
import bulkUploadModel from './model';

class BulkUploadRepository extends BaseRepository<IBulkUpload> {
    constructor() {
        super(bulkUploadModel);
    }

    update = async (id: string, newData: IBulkUpload): Promise<IBulkUpload | null> => {
        const result: IBulkUpload | null = await this.model.findByIdAndUpdate(
            id,
            { $set: newData },
            { new: true },
        );
        return result;
    };
}

export default BulkUploadRepository;
