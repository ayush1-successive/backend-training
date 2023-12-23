import JobRepository from './repositories/repository';
import IJobListing from './entities/IJobListing';

class JobService {
    jobRepository: JobRepository;

    constructor() {
        this.jobRepository = new JobRepository();
    }

    getAll = async (): Promise<IJobListing[] | null> => {
        const result: IJobListing[] | null = await this.jobRepository.findAll();
        return result;
    };

    getById = async (jobId: string): Promise<IJobListing | null> => {
        const result: IJobListing | null = await this.jobRepository.getById(jobId);
        return result;
    };

    create = async (job: IJobListing): Promise<IJobListing> => {
        const result = await this.jobRepository.create(job);
        return result;
    };
}

export default JobService;
