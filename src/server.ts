import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandlerMiddleware } from "./common/middleware";
import { projectRoutes } from "./features/projects";
import { taskRoutes } from "./features/tasks";
import { connectDB, corsConfig } from "./config";


dotenv.config();

connectDB();

const app = express();
app.use(cors(corsConfig))
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use(errorHandlerMiddleware);

export default app;