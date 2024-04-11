import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandlerMiddleware } from "./common/middleware";
import { connectDB, corsConfig } from "./config";
import { projectRoutes } from "./features/projects/infrastructure/routes/projectRoutes";
import { authRoutes } from "./features/auth/infrastructure/routes/authRoutes";

dotenv.config();

connectDB();

const app = express();
app.use(cors(corsConfig))
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandlerMiddleware);

export default app;