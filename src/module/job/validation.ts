import joi, { type ObjectSchema } from 'joi';
import { IJobListing } from './entities/IJobListing';

const jobValidation: ObjectSchema<IJobListing> = joi.object({
    title: joi.string().required(),
    company: joi.string().required(),
    address: joi.string(),
    jobType: joi.string().required(),
    industry: joi.string(),
    description: joi.string(),
    requirements: joi.array(),
    responsibilities: joi.array(),
    qualifications: joi.object(),
    salary: joi.object(),
    applicationDeadline: joi.date(),
    isRemote: joi.boolean(),
    contactEmail: joi
        .string()
        .email({ tlds: { allow: false } })
        .trim()
        .required(),
    applicationLink: joi.string(),
});

export default jobValidation;
