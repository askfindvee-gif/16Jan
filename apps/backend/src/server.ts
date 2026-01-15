import { createApp } from './app';
import { env } from './config/env';

const app = createApp();

app.listen(env.port, () => {
  // Log a friendly message for first-time setup.
  console.log(`[backend] Server listening on http://localhost:${env.port}`);
});
