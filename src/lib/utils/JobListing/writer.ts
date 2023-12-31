import { createObjectCsvWriter } from 'csv-writer';

const csvWriter = createObjectCsvWriter({
    path: 'job_listings_small.csv',
    header: [
        { id: 'title', title: 'title' },
        { id: 'company', title: 'company' },
        { id: 'openings', title: 'openings' },
        { id: 'logo', title: 'logo' },
        { id: 'address.street', title: 'address.street' },
        { id: 'address.city', title: 'address.city' },
        { id: 'address.state', title: 'address.state' },
        { id: 'address.country', title: 'address.country' },
        { id: 'address.postalCode', title: 'address.postalCode' },
        { id: 'jobType', title: 'jobType' },
        { id: 'industry', title: 'industry' },
        { id: 'description', title: 'description' },
        { id: 'requirements', title: 'requirements' },
        { id: 'responsibilities', title: 'responsibilities' },
        { id: 'qualifications.education', title: 'qualifications.education' },
        { id: 'qualifications.minExperience', title: 'qualifications.minExperience' },
        { id: 'qualifications.maxExperience', title: 'qualifications.maxExperience' },
        { id: 'qualifications.skills', title: 'qualifications.skills' },
        { id: 'salary.amount', title: 'salary.amount' },
        { id: 'salary.currency', title: 'salary.currency' },
        { id: 'salary.periodicity', title: 'salary.periodicity' },
        { id: 'applicationDeadline', title: 'applicationDeadline' },
        { id: 'isRemote', title: 'isRemote' },
        { id: 'contactEmail', title: 'contactEmail' },
        { id: 'applicationLink', title: 'applicationLink' },
    ],
    headerIdDelimiter: '.',
});

export default csvWriter;
