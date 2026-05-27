import '@angular/compiler';
import path from 'path';
import { pathToFileURL } from 'url';
import fs from 'fs';
import express from 'express';

// Statischer Import deines Server-Bundles für den Vercel-Packer
import * as angularServerBundle from '../dist/app/server/main.server.mjs';

const app = express();

const baseDir = process.cwd();
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

    // 1. Die echte index.html einlesen
    let indexHtmlContent = fs.readFileSync(documentFilePath, 'utf8');

    // 🌟 DErfinale REGEX-SCHUTZ: Findet app-root, egal ob Attribute oder Klassen darin stehen
    const appRootRegex = /<app-root[\s\S]*?>[\s\S]*?<\/app-root>/i;

    if (!appRootRegex.test(indexHtmlContent)) {
      // Falls der Selektor komplett fehlt oder unleserlich ist, erzwingen wir ihn sauber im body
      indexHtmlContent = indexHtmlContent.replace(
        /<body([\s\S]*?)>/i,
        '<body$1><app-root></app-root>',
      );
    }

    // 🚀 Rendering ausführen
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

    res.status(500).send(`Kritischer Fehler.\n${error.message}`);
  }
});

export default app;
