import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// ⚠️ IMPORTANT: Replace 'YOUR_PROJECT_NAME' with your folder name inside dist/
const distFolder = join(__dirname, '..', 'dist', 'elisabethkoch.eu');
const browserDistFolder = join(distFolder, 'browser');
const serverDistFolder = join(distFolder, 'server');

// Serve static assets directly from the browser directory (images, CSS, JS)
app.use(express.static(browserDistFolder, { maxAge: '1y', index: false }));

// Fallback all web paths to Angular's Server-Side engine
app.all('*', async (req, res, next) => {
  try {
    // Dynamically pull your main.server.mjs file
    const bootstrapPath = join(serverDistFolder, 'main.server.mjs');
    const { default: bootstrap } = await import(bootstrapPath);

    // Pull the rendering engine natively
    const { CommonEngine } = await import('@angular/ssr');
    const engine = new CommonEngine();

    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = `${protocol}://${host}${req.originalUrl}`;

    const html = await engine.render({
      bootstrap,
      documentFilePath: join(browserDistFolder, 'index.html'),
      url,
      publicPath: browserDistFolder,
    });

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (err) {
    // If the server fails, this trace outputs exactly why onto your screen
    res.status(500).send(`Angular SSR Crash Trace:\n${err.stack}`);
  }
});

export default app;
