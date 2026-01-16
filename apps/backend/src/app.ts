import express from 'express';
import { routes } from './routes';

export const createApp = () => {
  const app = express();

  // Parse JSON bodies for future API endpoints.
  app.use(express.json());

  // The API surface will be mounted under /api.
  app.use('/api', routes);

  // Placeholder response until real features exist.
  app.use((_req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
  });

  return app;
};
