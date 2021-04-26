import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import authRoutes from './routes/auth.routes'
import path from 'path'
import userRoutes from './routes/userRoutes'
import photoRoutes from './routes/photo.routes'
import adminRoutes from './routes/admin.routes'
import postRoutes from './routes/post.routes'
const app: Application = express();

// settings
app.set('port', 3000 || process.env.PORT);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
//app.use('/photo', photoRoutes);
app.use('/post', postRoutes);
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;