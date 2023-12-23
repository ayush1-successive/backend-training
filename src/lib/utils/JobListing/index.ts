/* eslint-disable no-console */
// Generate fake JobListing data using @faker-js/faker

import generateFakeJobListing from './generator';
import csvWriter from './writer';

const numberOfJobListings: number = parseInt(process.argv[2] ?? '20', 10);

(async () => {
    console.time('generateData');

    // Create records
    const records = Array.from({ length: numberOfJobListings }, () => generateFakeJobListing());

    // Save to cs file
    await csvWriter.writeRecords(records);

    console.log(`${numberOfJobListings} job listings created!`);
    console.timeEnd('generateData');
})();
