import joi, { type ObjectSchema } from 'joi';
import IJobListing from './entities/IJobListing';

const jobValidation: ObjectSchema<IJobListing> = joi.object({
    title: joi.string().required(),
    company: joi.string().required(),
    address: joi.object(),
    jobType: joi.string().required(),
    industry: joi.string().required(),
    description: joi.string(),
    requirements: joi.array(),
    responsibilities: joi.array(),
    qualifications: joi.object(),
    salary: joi.number().integer(),
    applicationDeadline: joi.date().required(),
    isRemote: joi.boolean().required(),
    contactEmail: joi
        .string()
        .email({ tlds: { allow: false } })
        .trim()
        .required(),
    applicationLink: joi.string().required(),
});

export default jobValidation;
