import express from "express";
import { errorHandlerMiddleware } from "./middleware";
import { projectRoutes } from "./features/projects/infrastructure/routes/projectRoutes";
import { taskRoutes } from "./features/tasks/infrastructure/routes/taskRoutes";

const app = express();
app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use(errorHandlerMiddleware);

export default app;