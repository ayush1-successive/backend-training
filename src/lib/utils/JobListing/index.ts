/* eslint-disable no-console */

import IJobListing from '../../../module/job/entities/IJobListing';
import generateFakeJobListing from './generator';
import csvWriter from './writer';

const numberOfJobListings: number = parseInt(process.argv[2] ?? '20', 10);
const batchSize = 25000;

/**
 * Generate csv records (simplified)
 * Will throw javascript heap memory error on record_size ~ 1M

    // Create records
    const records: IJobListing[] = Array.from({ length }, () => generateFakeJobListing());

    // Save to cs file
    await csvWriter.writeRecords(records);
* */

const generateRecords = async (length: number): Promise<void> => {
    // Create records
    const records: IJobListing[] = Array.from({ length }, () => generateFakeJobListing());

    // Save to csv file
    await csvWriter.writeRecords(records);
};

// Generate csv records using batch-process
(async (): Promise<void> => {
    console.time('generateData');
    let recordsGenerated = 0;

    /* eslint-disable no-await-in-loop */
    while (recordsGenerated < numberOfJobListings) {
        const length = Math.min(batchSize, numberOfJobListings - recordsGenerated);

        await generateRecords(length);

        recordsGenerated += length;
        console.log(`${recordsGenerated} job listings created!`);
    }

    console.timeEnd('generateData');
})();
