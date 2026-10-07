import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '..', 'dist');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'digital-research-assistant',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is connected successfully' });
});

// Unknown API routes should return 404 JSON rather than the SPA page
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Static frontend
app.use(express.static(distPath));

// SPA fallback: serve index.html for all other routes
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Digital Research Assistant server listening on port ${PORT}`);
});
