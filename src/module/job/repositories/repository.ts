import { BaseRepository } from '../../../lib/base';
import IJobListing from '../entities/IJobListing';
import jobListingModel from './model';

class JobRepository extends BaseRepository<IJobListing> {
    constructor() {
        super(jobListingModel);
    }

    findByTitleAndCompany = async (title: string, company: string): Promise<IJobListing | null> => {
        const result: IJobListing | null = await this.model.findOne({ title, company });
        return result;
    };

    seed = async (job: IJobListing): Promise<void> => {
        const existingJob: IJobListing | null = await this.model.findOne({
            title: job.title,
            company: job.company,
        });

        if (!existingJob) {
            await this.createOne(job);
        }
    };
}

export default JobRepository;
