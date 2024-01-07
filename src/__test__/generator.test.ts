import fs from 'fs';
import generateCsv from '../lib/utils/JobListing';

describe('Random data generator test', () => {
    test('generator test', async () => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const csvPath = `./public/data/file-${uniqueSuffix}.csv`;

        await generateCsv(csvPath, 10, 1000);

        const doesCsvExist = fs.existsSync(csvPath);
        expect(doesCsvExist).toBe(true);

        fs.unlinkSync(csvPath);
    });
});
