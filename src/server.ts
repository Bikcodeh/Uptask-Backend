import express from "express";
import projectRoutes from './features/projects/infraestructure/routes/projectRoutes';

const app = express();

app.use('/api/projects', projectRoutes);

export default app;