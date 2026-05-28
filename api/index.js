import '@angular/compiler';
import path from 'path';
import fs from 'fs';
import express from 'express';

import * as angularServerBundle from '../dist/app/server/main.server.mjs';

const app = express();

const baseDir = process.cwd();
const distFolder = path.join(baseDir, 'dist', 'app');
const browserDistFolder = path.join(distFolder, 'browser');

app.use(express.static(browserDistFolder, { maxAge: '1y', index: false }));

// 🌟 DER ABSOLUTE SITEMAP-EXPRESS-BYPASS:
// Wenn Google oder du die sitemap.xml aufrufen, senden wir die Datei direkt an den Browser!
app.get('/sitemap.xml', (req, res) => {
  const sitemapPath = path.join(browserDistFolder, 'assets', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    res.setHeader('Content-Type', 'application/xml');
    return res.status(200).sendFile(sitemapPath);
  }
  res.status(404).send('Sitemap nicht auf der Festplatte gefunden.');
});

// Dein bestehender app.all('*') Block bleibt darunter völlig unverändert:
app.all('*', async (req, res) => {
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
