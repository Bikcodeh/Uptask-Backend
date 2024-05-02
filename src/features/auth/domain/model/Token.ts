import mongoose, { Schema, Types } from "mongoose";
import { ITokenDocument } from "../interface";

const tokenSchema: Schema = new Schema<ITokenDocument>({
    token: {
        type: String,
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expireAfterSeconds: 10800
    }
})

const Token = mongoose.model<ITokenDocument>('Token', tokenSchema);
export { Token };