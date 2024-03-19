import { errorHandlerMiddleware } from './middleware/errorMiddleware';
import express from "express";
import projectRoutes from './features/projects/infraestructure/routes/ProjectRoutes';

const app = express();
app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use(errorHandlerMiddleware);

export default app;