import mongoose from 'mongoose';
import IJobListing from '../entities/IJobListing';
import JobType from '../entities/JobType';

const jobListingSchema: mongoose.Schema<IJobListing> = new mongoose.Schema<IJobListing>(
    {
        title: { type: String, required: true },
        company: { type: String, required: true },
        logo: { type: String },
        openings: { type: Number },
        address: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            country: { type: String },
            postalCode: { type: String },
        },
        jobType: { type: String, enum: Object.values(JobType), required: true },
        industry: { type: String, required: true },
        description: { type: String },
        requirements: { type: [String] },
        responsibilities: { type: [String] },
        qualifications: {
            education: { type: String },
            minExperience: { type: Number, min: 0, max: 20 },
            maxExperience: { type: Number, min: 0, max: 20 },
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
    },
    { timestamps: true },
);

jobListingSchema.index({ title: 1, company: 1 }, { unique: true });

export default jobListingSchema;
