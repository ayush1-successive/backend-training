import joi, { type ObjectSchema } from 'joi';
import IUser from './entities/IUser';
import IUserLoginRequest from './entities/IUserLoginRequest';

const userValidation: ObjectSchema<IUser> = joi.object({
    name: joi.string().alphanum().min(3).max(30)
        .trim()
        .required(),
    email: joi.string().email({ tlds: { allow: false } }).trim().required(),
    password: joi
        .string()
        .custom((value, helper) => {
            if (value.length < 8) {
                return helper.error('Length error', {
                    message: 'Password must be at least 8 characters long',
                });
            }
            return value;
        })
        .required(),
    dateOfBirth: joi.date(),
    address: joi.string(),
    phoneNumber: joi.string(),
    isAdmin: joi.boolean(),
    interests: joi.array(),
});

const userLoginRequestValidation: ObjectSchema<IUserLoginRequest> = joi.object({
    email: joi.string().email({ tlds: { allow: false } }).trim().required(),
    password: joi.string().required(),
});

export { userValidation, userLoginRequestValidation };
