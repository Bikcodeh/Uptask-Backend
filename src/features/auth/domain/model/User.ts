import { IUser, IUserDocument } from './../interface/index';
import mongoose, { Schema, Types } from "mongoose";

const UserSchema: Schema = new Schema<IUserDocument>(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
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
            default: false
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model<IUserDocument>('User', UserSchema);
export { User };