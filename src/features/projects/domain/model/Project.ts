import { IProjectDocument } from './../interface/index';
import mongoose, { Schema, Types } from "mongoose";

const ProjectSchema: Schema = new Schema<IProjectDocument>(
    {
        projectName: {
            type: String,
            required: true,
            trim: true
        },
        clientName: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        tasks: [
            {
                type: Types.ObjectId,
                ref: 'Task'
            }
        ]
    },
    {
        timestamps: true
    }
);

const Project = mongoose.model<IProjectDocument>('Project', ProjectSchema);
export { Project };