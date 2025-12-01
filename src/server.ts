import { createApp } from './app';
import { PORT } from './config/env';

const app = createApp();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});