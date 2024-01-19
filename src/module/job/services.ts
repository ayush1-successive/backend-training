import fs from 'fs';
import Papa from 'papaparse';
import jobListingData from '../../lib/jobListingData';
import logger from '../../lib/logger';
import IJobListing from './entities/IJobListing';
import JobRepository from './repositories/repository';
import BulkUploadService from '../bulkupload/service';

class JobService {
    jobRepository: JobRepository;

    constructor() {
        this.jobRepository = new JobRepository();
    }

    static getFilters = async (queryObj: any): Promise<any> => {
        // QUERY FILTER
        let filters: any = { ...queryObj };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => delete filters[el]);

        // gt, lt manipulation
        let queryStr: string = JSON.stringify(filters);
        queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, (match) => `$${match}`);

        filters = JSON.parse(queryStr);

        // Key update
        filters = Object.entries(filters).reduce(
            (acc, [key, value]) => ({ ...acc, [key]: (value as string).split(',') }),
            {},
        );

        if (filters.title) {
            filters.title = { $regex: filters.title[0], $options: 'i' };
        }

        if (filters.salary) {
            const minSalary: number = parseInt(filters.salary[0], 10) * 100000;
            const maxSalary: number = parseInt(filters.salary[1], 10) * 100000;
            filters.salary = { $gte: minSalary, $lte: maxSalary };
        }

        return filters;
    };

    countDocuments = async (filters: any): Promise<number> => {
        const result: number = await this.jobRepository.countDocuments(filters);
        return result;
    };

    getAll = async (
        queryObj: any,
        filters: any,
        page: number,
        limit: number,
    ): Promise<IJobListing[] | null> => {
    // SORT
        const sortBy: string = queryObj.sort
            ? (queryObj.sort as string).split(',').join(' ')
            : '-createdAt';

        // FIELD LIMITING
        const fields: string = queryObj.fields
            ? (queryObj.fields as string).split(',').join(' ')
            : '-__v';

        const jobs: IJobListing[] | null = await this.jobRepository.getAll(
            filters,
            sortBy,
            fields,
            page,
            limit,
        );
        return jobs;
    };

    initialSeed = async (): Promise<void> => {
        const tasks: Promise<void>[] = jobListingData.map(
            (job: IJobListing) => this.jobRepository.seed(job),
        );
        await Promise.all(tasks);
    };

    getById = async (
        jobId: string,
        fields: string,
    ): Promise<IJobListing | null> => {
        const result: IJobListing | null = await this.jobRepository.getById(
            jobId,
            fields,
        );
        return result;
    };

    updateById = async (
        jobId: string,
        newData: IJobListing,
    ): Promise<IJobListing | null> => {
        const result: IJobListing | null = await this.jobRepository.update(
            jobId,
            newData,
        );
        return result;
    };

    create = async (job: IJobListing): Promise<IJobListing> => {
        const result: IJobListing = await this.jobRepository.createOne(job);
        return result;
    };

    static transformEntry = (csvData: any): IJobListing => {
        const result: any = {};

        Object.entries(csvData).forEach(([key, value]) => {
            if (key.includes('.')) {
                const [firstKey, secondKey] = key.split('.');
                result[firstKey] = { ...result[firstKey], [secondKey]: value };
            } else {
                result[key] = value;
            }
        });

        if (result.requirements) {
            result.requirements = result.requirements.split(',');
        }

        if (result.responsibilities) {
            result.responsibilities = result.responsibilities.split(',');
        }

        if (result.qualifications?.skills) {
            result.qualifications.skills = result.qualifications.skills.split(',');
        }

        return result as IJobListing;
    };

    processBatch = async (
        batch: any[],
        uploadService: BulkUploadService,
        uploadData: any,
        recordId: string,
        status: string,
        startTime: number,
    ): Promise<void> => {
        try {
            const jobs: IJobListing[] = batch.map((job: any) => JobService.transformEntry(job));

            const bulkOps = jobs.map((job) => ({
                updateOne: {
                    filter: {
                        title: job.title,
                        company: job.company,
                    },
                    update: { $set: job },
                    upsert: true,
                },
            }));

            const result = await this.jobRepository.model.bulkWrite(bulkOps, {
                ordered: false,
            });

            logger.info('batch process result', result);
            const successfulEntries = result.modifiedCount + result.upsertedCount;

            /* eslint-disable no-param-reassign */
            uploadData.entriesCompleted += batch.length;
            uploadData.successfulEntries += successfulEntries;
            uploadData.failedEntries += batch.length - successfulEntries;

            await uploadService.updateById(recordId, {
                ...uploadData,
                status,
                time: performance.now() - startTime,
            });
        } catch (error: unknown) {
            logger.error('error in batch process', error);
        }
    };

    writeBulkData = async (filename: string, filePath: string): Promise<void> => {
        logger.info('csv write to mongodb started!');

        const csvReadStream = fs.createReadStream(filePath, 'utf-8');
        let batch: any[] = [];

        const maxBatchSize: number = 10000;
        const bulkUploadService: BulkUploadService = new BulkUploadService();
        const hollowEntry: any = await bulkUploadService.generateHollowEntry(
            filename,
        );

        // eslint-disable-next-line no-underscore-dangle
        const { _id, ...uploadData } = hollowEntry._doc;
        const recordId = _id.toString();

        const startTime: number = performance.now();

        Papa.parse(csvReadStream, {
            header: true,
            skipEmptyLines: true,

            step: async (item: any, parser: Papa.Parser) => {
                batch.push(item.data);

                if (batch.length < maxBatchSize) return;

                parser.pause();
                await this.processBatch(
                    batch,
                    bulkUploadService,
                    uploadData,
                    recordId,
                    'running',
                    startTime,
                );
                batch = [];
                parser.resume();
            },
            complete: async () => {
                await this.processBatch(
                    batch,
                    bulkUploadService,
                    uploadData,
                    recordId,
                    'completed',
                    startTime,
                );

                csvReadStream.close();
                fs.unlinkSync(filePath);
                logger.info('csv parsing complete');
            },
            error: async () => {
                batch = [];
                await this.processBatch(
                    batch,
                    bulkUploadService,
                    uploadData,
                    recordId,
                    'failed',
                    startTime,
                );

                csvReadStream.close();
                fs.unlinkSync(filePath);
                logger.error('csv parsing failed!');
            },
        });
    };

    deleteById = async (id: string): Promise<void> => {
        await this.jobRepository.deleteById(id);
    };

    deleteAll = async (): Promise<void> => {
        await this.jobRepository.deleteAll();
    };
}

export default JobService;
