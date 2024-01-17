import joi, { type ObjectSchema } from 'joi';
import IUser from './entities/IUser';
import IUserLoginRequest from './entities/IUserLoginRequest';

const userValidation: ObjectSchema<IUser> = joi.object({
    name: joi.string().min(3).max(30).trim()
        .required(),
    email: joi.string().email({ tlds: { allow: false } }).trim().required(),
    password: joi
        .string()
        .when('$mode', {
            is: 'create',
            then: joi.custom((value, helper) => {
                if (value.length < 8) {
                    return helper.message({ custom: 'Password must be at least 8 characters long' });
                }
                return value;
            }).required(),
        }),
    dateOfBirth: joi.date(),
    gender: joi.string(),
    phoneNumber: joi.string().allow(''),
    summary: joi.string().allow(''),
    skills: joi.array().items(joi.string()),
    domains: joi.array().items(joi.string()),
    achievements: joi.array().items(joi.string()),
    resume: joi.binary().max(1048576),
});

const userLoginRequestValidation: ObjectSchema<IUserLoginRequest> = joi.object({
    email: joi.string().email({ tlds: { allow: false } }).trim().required(),
    password: joi.string().required(),
});

export { userValidation, userLoginRequestValidation };
