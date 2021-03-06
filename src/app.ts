import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as http from "http"
import authRoutes from './routes/auth.routes'
import path from 'path'
import userRoutes from './routes/user.routes'
import photoRoutes from './routes/photo.routes'
import adminRoutes from './routes/admin.routes'
import postRoutes from './routes/post.routes'
import salaRoutes from './routes/salas.routes'
import postusuariosRoutes from './routes/postusuarios.routes'
import fileUpload from 'express-fileupload';
const app: Application = express();

// settings
app.set('port', 3000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//File Upload
app.use( fileUpload());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
//app.use('/photo', photoRoutes);
app.use('/post', postRoutes);
app.use('/sala', salaRoutes);
app.use('/uploads', express.static(path.resolve('uploads')));
//usuario hace post
app.use('/postusuario', postusuariosRoutes);


//webSocket



export default app;