import express from 'express';
import itemRoutes from './routes/itemRoutes';
import { errorHandler } from './middlewares/erroHandler';

const app = express();

app.use('/api/items', itemRoutes);
app.use(errorHandler);

export default app;
