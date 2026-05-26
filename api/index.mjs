// 🌟 Durch die Endung .mjs wird diese Datei auf Vercel nativ als ES-Modul ausgeführt!
import '@angular/compiler';

import path from 'path';
import { pathToFileURL } from 'url';
import fs from 'fs';
import express from 'express';

const app = express();
const baseDir = process.cwd();
const distFolder = path.join(baseDir, 'dist', 'elisabethkoch.eu');
const browserDistFolder = path.join(distFolder, 'browser');
const serverDistFolder = path.join(distFolder, 'server');

// Statische Dateien (Bilder, CSS, JS) direkt an Express binden
app.use(express.static(browserDistFolder, { maxAge: '1y', index: false }));

app.all('*', async (req, res) => {
  try {
    const serverModulePath = path.join(serverDistFolder, 'main.server.mjs');
    const documentFilePath = path.join(browserDistFolder, 'index.html');

    if (!fs.existsSync(documentFilePath)) {
      return res
        .status(500)
        .send(
          `Cloud-Fehler: index.html fehlt unter Pfad:\n${documentFilePath}`,
        );
    }

    process.env['BROWSER_DIST_DIR'] = browserDistFolder;

    // Server-Bundle laden
    const moduleUrl = pathToFileURL(serverModulePath).href;
    const module = await import(moduleUrl);

    // Angular SSR Engine laden
    const { CommonEngine } = await import('@angular/ssr');
    const engine = new CommonEngine();

    const bootstrap = module.default || module.bootstrap;
    if (!bootstrap) {
      return res
        .status(500)
        .send('Kein gültiger Bootstrap-Export in main.server.mjs gefunden.');
    }

    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = `${protocol}://${host}${req.originalUrl}`;

    const html = await engine.render({
      bootstrap,
      documentFilePath,
      url,
      publicPath: browserDistFolder,
    });

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    res
      .status(500)
      .send(
        `Angular Cloud-Boot Fehler:\n${error.message}\n\nStack:\n${error.stack}`,
      );
  }
});

export default app;
