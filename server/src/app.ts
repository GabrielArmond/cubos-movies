import express from 'express';
import userRoutes from './routes/userRoutes';
import movieRoutes from './routes/movieRoutes';
import uploadRoutes from './routes/uploadRoutes';
import emailRoutes from './routes/emailRoutes';
import { errorHandler } from './middlewares/erroHandler';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/email', emailRoutes);

app.use(errorHandler);

export default app;
