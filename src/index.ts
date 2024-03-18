import 'reflect-metadata';
import 'express-async-errors';
import dotenv from 'dotenv';
import colors from '@colors/colors';
import server from './server';
import { connectDB } from './config/db';

dotenv.config();

connectDB();

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(colors.cyan.bold(`Server listening on port ${port}`));
});