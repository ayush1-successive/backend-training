import { faker } from '@faker-js/faker';
import academicDegrees from './education';
import industryOptions from './industry';
import JobType from '../../../module/job/entities/JobType';

const generateFakeJobListing = () => {
    const minExperience = faker.number.int({ min: 0, max: 10 });
    const maxExperience = faker.number.int({ min: minExperience, max: 15 });

    return {
        title: faker.person.jobTitle(),
        company: faker.company.name(),
        logo: faker.image.url(),
        openings: faker.number.int({ min: 1, max: 20 }),
        address: {
            street: faker.location.street(),
            city: faker.location.city(),
            state: faker.location.state(),
            country: faker.location.country(),
            postalCode: faker.location.zipCode(),
        },
        jobType: faker.helpers.enumValue(JobType),
        industry: faker.helpers.arrayElement(industryOptions),
        description: faker.lorem.paragraph(),
        requirements: faker.lorem.sentences(3),
        responsibilities: faker.lorem.sentences(2),
        qualifications: {
            education: faker.helpers.arrayElement(academicDegrees),
            minExperience,
            maxExperience,
            skills: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
        },
        salary: {
            amount: faker.number.int({ min: 5000, max: 100000 }),
            currency: faker.finance.currencyCode(),
            periodicity: faker.helpers.arrayElement(['Hourly', 'Daily', 'Monthly', 'Annually']),
        },
        applicationDeadline: faker.date.future(),
        isRemote: faker.helpers.arrayElement([true, false]),
        contactEmail: faker.internet.email(),
        applicationLink: faker.internet.url(),
    };
};

export default generateFakeJobListing;
