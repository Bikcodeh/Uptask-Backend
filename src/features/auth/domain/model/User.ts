import { IUser, IUserDocument } from './../interface/index';
import mongoose, { Schema, Types } from "mongoose";

const UserSchema: Schema = new Schema<IUserDocument>(
    {
        email: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        confirmed: {
            type: Boolean,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model<IUserDocument>('User', UserSchema);
export { User };