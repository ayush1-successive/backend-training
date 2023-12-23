import { IBase } from '../../../lib/base';
import IAddress from './IAddress';
import JobType from './JobType';

interface IJobListing extends IBase {
  jobId: string,
  title: string;
  company: string;
  logo: string;
  openings: number;
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

export default IJobListing;
