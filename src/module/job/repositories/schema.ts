import mongoose from 'mongoose';
import { JobType, type IJobListing } from '../entities/IJobListing';

const jobListingSchema: mongoose.Schema<IJobListing> = new mongoose.Schema<IJobListing>({
    title: { type: String, required: true },
    company: { type: String, required: true },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String },
    },
    jobType: { type: String, enum: Object.values(JobType), required: true },
    industry: { type: String, required: true },
    description: { type: String },
    requirements: { type: [String] },
    responsibilities: { type: [String] },
    qualifications: {
        education: { type: String },
        experienceYears: { type: Number, min: 0 },
        skills: { type: [String] },
    },
    salary: {
        amount: { type: Number, min: 0 },
        currency: { type: String },
        periodicity: { type: String },
    },
    applicationDeadline: { type: Date, required: true },
    isRemote: { type: Boolean, required: true },
    contactEmail: { type: String, required: true },
    applicationLink: { type: String, required: true },
}, { timestamps: true });

jobListingSchema.index({ title: 1, company: 1 }, { unique: true });

export default jobListingSchema;
