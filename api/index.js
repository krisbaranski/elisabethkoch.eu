import '@angular/compiler';
import path from 'path';
import fs from 'fs';
import express from 'express';

// Statischer Import deines Server-Bundles für den Vercel-Packer
import * as angularServerBundle from '../dist/app/server/main.server.mjs';

const app = express();

const baseDir = process.cwd();
const distFolder = path.join(baseDir, 'dist', 'app');
const browserDistFolder = path.join(distFolder, 'browser'); // 🌟 Wieder auf browser-Ordner gesetzt!

app.use(express.static(browserDistFolder, { maxAge: '1y', index: false }));

app.all('*', async (req, res) => {
  // Wir lesen die vom postbuild-Skript kopierte index.ssr.html ein
  const documentFilePath = path.join(baseDir, 'api', 'index.ssr.html');

  try {
    process.env['BROWSER_DIST_DIR'] = browserDistFolder;
    const bootstrap =
      angularServerBundle.default || angularServerBundle.bootstrap;
    if (!bootstrap || typeof bootstrap !== 'function') {
      throw new Error('Gültige Bootstrap-Funktion in main.server.mjs fehlt.');
    }

    const { CommonEngine } = await import('@angular/ssr');
    const engine = new CommonEngine();

    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = `${protocol}://${host}${req.originalUrl}`;

    const indexHtmlContent = fs.readFileSync(documentFilePath, 'utf8');

    // Rendering ausführen
    const html = await engine.render({
      bootstrap,
      document: indexHtmlContent,
      url,
      publicPath: browserDistFolder,
      inlineCriticalCss: false,
    });

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
  } catch (error) {
    console.error(
      'SSR Initialisierung fehlgeschlagen, wechsle zu Fallback:',
      error.message,
    );

    if (fs.existsSync(documentFilePath)) {
      const clientHtml = fs.readFileSync(documentFilePath, 'utf8');
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(clientHtml);
    }

    res.status(500).send(`Kritischer Fehler.\n${error.message}`);
  }
});

export default app;
