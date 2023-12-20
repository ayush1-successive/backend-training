import { type IBase } from '../../../lib/base';

// TODO: Add field to store resume.

interface IUser extends IBase {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  isAdmin: boolean;
  interests: string[];
}

// TODO: Fields
// Gender
// Address (Complete)
//

/*
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
