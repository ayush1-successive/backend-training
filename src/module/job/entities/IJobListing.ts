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
    experienceYears: number;
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

// import { type Document } from 'mongoose';

// export interface Mobile extends Document {
//   brand: string;
//   modelNumber: string;
//   price: number;
//   color: string;
//   specifications: {
//     display: string;
//     camera: string;
//     processor: string;
//     storage: string;
//   };
//   releaseDate: Date;
//   batteryCapacity: string;
//   connectivity: {
//     wifi: boolean;
//     bluetooth: boolean;
//     cellular: boolean;
//   };
//   weight?: number; // Optional
//   operatingSystem: string;
//   isWaterResistant: boolean;
//   additionalFeatures?: string[];
//   accessories?: Array<{
//     name: string;
//     type?: string;
//     price?: number;
//   }>;
//   warranty?: {
//     validUntil?: Date;
//     type?: string;
//   };
//   image: string;

// }
