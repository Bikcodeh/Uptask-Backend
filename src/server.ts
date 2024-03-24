import express from "express";
import { errorHandlerMiddleware } from "./common/middleware";
import { projectRoutes } from "./features/projects";
import { taskRoutes } from "./features/tasks";
import morgan from 'morgan';


const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use(errorHandlerMiddleware);

export default app;