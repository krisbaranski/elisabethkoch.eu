import '@angular/compiler';
import path from 'path';
import { pathToFileURL } from 'url';
import fs from 'fs';
import express from 'express';

// Statischer Import deines Server-Bundles für den Vercel-Packer
import * as angularServerBundle from '../dist/app/server/main.server.mjs';

const app = express();

// 🌟 DER ANGULAR 18 PATH-FIX: Löst die Verzeichnisse absolut sicher relativ zur API-Laufzeit auf
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const baseDir = path.resolve(__dirname, '..');
const distFolder = path.join(baseDir, 'dist', 'app');
const browserDistFolder = path.join(distFolder, 'browser');

// Statische Assets direkt ausliefern (CSS, JS, Bilder)
app.use(express.static(browserDistFolder, { maxAge: '1y', index: false }));

app.all('*', async (req, res) => {
  const documentFilePath = path.join(browserDistFolder, 'index.html');

  try {
    process.env['BROWSER_DIST_DIR'] = browserDistFolder;
    const bootstrap =
      angularServerBundle.default || angularServerBundle.bootstrap;

    const { CommonEngine } = await import('@angular/ssr');
    const engine = new CommonEngine();

    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = `${protocol}://${host}${req.originalUrl}`;

    // Die echte index.html auslesen
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
      'SSR fehlgeschlagen, sende sicheren Client-Fallback:',
      error.message,
    );

    // Unser bewährter Sicherheitsgurt liefert im Fehlerfall die stabile Client-App
    if (fs.existsSync(documentFilePath)) {
      const clientHtml = fs.readFileSync(documentFilePath, 'utf8');
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(clientHtml);
    }

    res
      .status(500)
      .send(
        `Kritischer Fehler: Vorlage fehlt.\n${error.message}\n\nGesuchter Pfad:\n${documentFilePath}`,
      );
  }
});

export default app;
