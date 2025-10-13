import express from 'express';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/erroHandler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;
