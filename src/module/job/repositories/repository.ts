import { BaseRepository } from '../../../lib/base';
import { IJobListing } from '../entities/IJobListing';
import jobListingModel from './model';

class JobRepository extends BaseRepository<IJobListing> {
    constructor() {
        super(jobListingModel);
    }

    // TODO: Assign a unique jobId when a creating a new job listing
    // Use mongoose Id to be jobId for now.
    create = async (job: IJobListing): Promise<IJobListing> => {
        const result: IJobListing = await this.createOne(job);
        return result;
    };
}

export default JobRepository;
