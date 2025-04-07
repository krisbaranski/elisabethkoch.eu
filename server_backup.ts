// server.ts
import 'zone.js/node';
import express from 'express';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { APP_BASE_HREF } from '@angular/common';
import { renderApplication } from '@angular/platform-server';

const app = express();
const PORT = process.env['PORT'] || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/elisabethkoch.eu/browser');
const INDEX_HTML = existsSync(join(DIST_FOLDER, 'index.original.html'))
  ? 'index.original.html'
  : 'index.html';

// Serve static files
app.get(
  '*.*',
  express.static(DIST_FOLDER, {
    maxAge: '1y',
  })
);

// SSR handler
app.get('*', async (req, res) => {
  const document = readFileSync(join(DIST_FOLDER, INDEX_HTML), 'utf8');

  try {
    const bootstrap = await import('./src/main.server');
    const html = await bootstrap.default();

    res.status(200).send(html);
  } catch (err) {
    console.error('❌ SSR Render Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server listening at http://localhost:${PORT}`);
});
