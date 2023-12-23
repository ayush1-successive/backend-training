import { createObjectCsvWriter } from 'csv-writer';

const csvWriter = createObjectCsvWriter({
    path: 'job_listings.csv',
    header: [
        { id: 'title', title: 'Title' },
        { id: 'company', title: 'Company' },
        { id: 'openings', title: 'Openings' },
        { id: 'address.street', title: 'Address.street' },
        { id: 'address.city', title: 'Address.city' },
        { id: 'address.state', title: 'Address.state' },
        { id: 'address.country', title: 'Address.country' },
        { id: 'address.postalCode', title: 'Address.postalCode' },
        { id: 'jobType', title: 'Job Type' },
        { id: 'industry', title: 'Industry' },
        { id: 'description', title: 'Description' },
        { id: 'requirements', title: 'Requirements' },
        { id: 'responsibilities', title: 'Responsibilities' },
        { id: 'qualifications.education', title: 'Qualifications.education' },
        { id: 'qualifications.minExperience', title: 'Qualifications.minExperience' },
        { id: 'qualifications.maxExperience', title: 'Qualifications.maxExperience' },
        { id: 'qualifications.skills', title: 'Qualifications.skills' },
        { id: 'salary.amount', title: 'Salary.amount' },
        { id: 'salary.currency', title: 'Salary.currency' },
        { id: 'salary.periodicity', title: 'Salary.periodicity' },
        { id: 'applicationDeadline', title: 'Application Deadline' },
        { id: 'isRemote', title: 'Is Remote' },
        { id: 'contactEmail', title: 'Contact Email' },
        { id: 'applicationLink', title: 'Application Link' },
    ],
    headerIdDelimiter: '.',
});

export default csvWriter;
