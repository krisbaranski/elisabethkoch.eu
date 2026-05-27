import '@angular/compiler';
import path from 'path';
import fs from 'fs';
import express from 'express';

// Statischer Import deines Server-Bundles für den Vercel-Packer
import * as angularServerBundle from '../dist/app/server/main.server.mjs';

const app = express();

const baseDir = process.cwd();
const distFolder = path.join(baseDir, 'dist', 'app');
const browserDistFolder = path.join(distFolder, 'browser');

// Statische Assets (CSS, JS, Bilder) direkt über das CDN ausliefern
app.use(express.static(browserDistFolder, { maxAge: '1y', index: false }));

app.all('*', async (req, res) => {
  // 🌟 DER ULTIMATIVE SPEICHER-FIX: Wir lesen die Vorlage direkt aus dem api/-Ordner!
  // Das verhindert jegliche "Not Found"-Fehler im Cloud-Container.
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

    // Liest die vom Automatisierungs-Skript kopierte Vorlage aus
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

    // Falls das SSR im Hintergrund zuckt, sendet der Sicherheitsgurt das echte Client-HTML.
    // Die Seite lädt dadurch IMMER sofort für den Besucher und wird niemals weiß!
    if (fs.existsSync(documentFilePath)) {
      const clientHtml = fs.readFileSync(documentFilePath, 'utf8');
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(clientHtml);
    }

    res
      .status(500)
      .send(
        `Kritischer Fehler: Vorlage fehlt.\n${error.message}\n\nPfad:\n${documentFilePath}`,
      );
  }
});

export default app;
