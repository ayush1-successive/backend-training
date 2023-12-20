import mongoose from 'mongoose';
import { type IJobListing } from '../entities/IJobListing';
import jobListingSchema from './schema';

const jobListingModel: mongoose.Model<IJobListing> = mongoose.model<IJobListing>('jobListing', jobListingSchema);

export default jobListingModel;
