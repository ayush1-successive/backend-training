import mongoose from 'mongoose';
import IUser from '../entities/IUser';

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        dateOfBirth: { type: String },
        address: { type: String },
        phoneNumber: { type: String },
        isAdmin: { type: Boolean },
        interests: { type: [String], default: [] },
    },
    { timestamps: true },
);

export default userSchema;
