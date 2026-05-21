import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// ⚠️ CRITICAL: Replace 'YOUR_PROJECT_NAME' with your actual folder inside dist/
const distFolder = join(__dirname, '..', 'dist', 'elisabethkoch.eu');
const browserDistFolder = join(distFolder, 'browser');
const serverDistFolder = join(distFolder, 'server');

// Mock missing browser variables for Vercel's isolated environment
global['window'] = global;
global['document'] = {};

// Handle all static assets directly through the browser directory
app.get('*.*', express.static(browserDistFolder, { maxAge: '1y' }));

// Forward web paths directly into Angular's main.server bootstrap pipeline
app.get('*', async (req, res, next) => {
  try {
    const { default: bootstrap } = await import(
      join(serverDistFolder, 'main.server.mjs')
    );
    const { CommonEngine } = await import('@angular/ssr');

    const engine = new CommonEngine();
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;

    const html = await engine.render({
      bootstrap,
      documentFilePath: join(browserDistFolder, 'index.html'),
      url: `${protocol}://${host}${req.originalUrl}`,
      publicPath: browserDistFolder,
    });

    res.send(html);
  } catch (err) {
    next(err);
  }
});

export default app;
