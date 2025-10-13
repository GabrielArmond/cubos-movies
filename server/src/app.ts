import express from 'express';
import userRoutes from './routes/userRoutes';
import tmdbRoutes from './routes/tmdbRoutes';
import { errorHandler } from './middlewares/erroHandler';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: true, credentials: true }));

app.use('/api/users', userRoutes);
app.use('/api/movies', tmdbRoutes);

app.use(errorHandler);

export default app;
