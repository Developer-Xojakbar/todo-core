import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import { taskRouter } from './routes';
import { globalErrorMiddleWare } from './middlewares';

const app = express();

app.use(cors());
app.use(express.json());

// Define your routes and middleware here

const PORT = process.env.PORT || 8000;

const apiVersion = '/api/v1';
app.use(`${apiVersion}/tasks`, taskRouter);

app.use(globalErrorMiddleWare);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
