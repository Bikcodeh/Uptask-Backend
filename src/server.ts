import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandlerMiddleware } from "./common/middleware";
import { projectRoutes } from "./features/projects";
//import { authRoutes } from "./features/auth";
import { connectDB, container, corsConfig } from "./config";


dotenv.config();

connectDB();

const app = express();
app.use(cors(corsConfig))
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/projects', projectRoutes);
//app.use('/api/auth', authRoutes);
app.use(errorHandlerMiddleware);

export default app;