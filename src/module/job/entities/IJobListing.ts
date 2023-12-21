/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { type IBase } from '../../../lib/base';
import IAddress from './IAddress';

enum JobType {
  FullTime = 'Full-time',
  PartTime = 'Part-time',
  Contract = 'Contract',
  Freelance = 'Freelance',
  Internship = 'Internship',
  Temporary = 'Temporary',
  Other = 'Other',
}

interface IJobListing extends IBase {
  jobId: string,
  title: string;
  company: string;
  address: IAddress;
  jobType: JobType;
  industry: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  qualifications: {
    education: string;
    minExperience: number;
    maxExperience: number;
    skills: string[];
  };
  salary: {
    amount: number;
    currency: string;
    periodicity: 'hour' | 'day' | 'week' | 'month' | 'year';
  };
  applicationDeadline: Date;
  isRemote: boolean;
  contactEmail: string;
  applicationLink?: string;
}

export { JobType, IJobListing };
