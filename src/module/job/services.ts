/* eslint-disable no-console */
import fs from 'fs';
import csv from 'csvtojson';
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

    getByTitleAndCompany = async (
        title: string,
        company: string,
    ): Promise<IJobListing | null> => {
        const result: IJobListing | null = await this.jobRepository.findByTitleAndCompany(
            title,
            company,
        );
        return result;
    };

    // Seed all joblistings to database
    seedAll = async (jobListings: IJobListing[]): Promise<void> => {
        const tasks: Promise<void>[] = jobListings.map(
            (job: IJobListing) => this.jobRepository.seed(job),
        );
        await Promise.all(tasks);
    };

    getById = async (jobId: string): Promise<IJobListing | null> => {
        const result: IJobListing | null = await this.jobRepository.getById(jobId);
        return result;
    };

    create = async (job: IJobListing): Promise<IJobListing> => {
        const result = await this.jobRepository.create(job);
        return result;
    };

    writeBulkData = async (filePath: string): Promise<void> => {
        console.time('CSV write');

        let successEntries = 0;
        let errorEntries = 0;
        csv()
            .fromFile(filePath)
            .subscribe(
                (json) => new Promise((resolve) => {
                    this.jobRepository
                        .create(json)
                        .then(() => {
                            successEntries += 1;
                            resolve();
                        })
                        .catch((error) => {
                            errorEntries += 1;
                            console.error('Error seeding data:', error.message);
                            resolve();
                        });
                }),

                (error: any) => {
                    console.error('Error:', error);
                },
                () => {
                    console.log('CSV processing complete');
                    console.timeEnd('CSV write');
                    console.log('successEntries =', successEntries);
                    console.log('errorEntries =', errorEntries);
                    fs.unlinkSync(filePath);
                },
            );
    };
}

export default JobService;
