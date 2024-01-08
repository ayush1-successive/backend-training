import { type IBase } from '../../../lib/base';

interface IUser extends IBase {
    name: string;
    email: string;
    password: string;
    dateOfBirth?: string;
    address?: string;
    phoneNumber?: string;
    isAdmin?: boolean;
    interests?: string[];
}

/*
 * Fields
 * Name
 * Email
 * Password
 * PhoneNumber
 * dateOfBirth
 * Address
 * Summary
 * Work Experience
 * Skills
 * Accomplishments
 * Resume
 * Interests
*/

export default IUser;
