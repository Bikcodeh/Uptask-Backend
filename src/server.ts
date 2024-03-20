import express from "express";
import { projectRoutes } from './features/projects';
import { taskRoutes } from "./features/tasks";
import { errorHandlerMiddleware } from "./middleware";

const app = express();
app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use(errorHandlerMiddleware);

export default app;