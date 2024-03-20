import { ITaskDocument, taskStatus } from './../interface';
import mongoose, { Schema, Types } from "mongoose";

const TaskSchema: Schema = new Schema<ITaskDocument>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        project: {
            type: Types.ObjectId,
            ref: 'Project'
        },
        status: {
            type: String,
            enum: Object.values(taskStatus),
            default: taskStatus.PENDING
        }
    },
    {
        timestamps: true
    }
);

const Task = mongoose.model<ITaskDocument>('Task', TaskSchema);
export { Task }