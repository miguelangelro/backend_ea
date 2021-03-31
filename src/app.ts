import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import authRoutes from './routes/auth'


const app: Application = express();

// settings
app.set('port', 3000 || process.env.PORT);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);


export default app;