// src/app.ts

import express from 'express';
import bookRoutes from './routes/bookRoutes';

const app = express();

app.use(express.json());

app.use('/api', bookRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);

  res.status(500).json({
    message: err.message || 'An unexpected error occurred.',
  });
});

export default app;