import '@angular/compiler';
import path from 'path';
import fs from 'fs';
import express from 'express';

// 1. Wir importieren direkt den fertigen Request-Handler von Angular 18
import { reqHandler } from '../dist/app/server/main.server.mjs';

const app = express();

const baseDir = process.cwd();
const distFolder = path.join(baseDir, 'dist', 'app');
const browserDistFolder = path.join(distFolder, 'browser');

// Statische Dateien (CSS, JS, Bilder) direkt ausliefern
app.use(express.static(browserDistFolder, { maxAge: '1y', index: false }));

// 🌟 DER SITEMAP-EXPRESS-BYPASS:
app.get('/sitemap.xml', (req, res) => {
  const sitemapPath = path.join(browserDistFolder, 'assets', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    res.setHeader('Content-Type', 'application/xml');
    return res.status(200).sendFile(sitemapPath);
  }
  res.status(404).send('Sitemap nicht auf der Festplatte gefunden.');
});

// 🌟 NEU: Übergabe ALLER Routen an den offiziellen Angular 18 SSR-Handler
app.all('*', (req, res, next) => {
  try {
    // Angular 18 regelt das Rendering, Routing und Fallbacks vollautomatisch
    return reqHandler(req, res, next);
  } catch (error) {
    console.error('Kritischer Fehler im Angular SSR Handler:', error.message);

    // Sicherer Fallback: Wenn alles reißt, laden wir die statische index.html aus dem browser-Ordner
    const fallbackHtmlPath = path.join(browserDistFolder, 'index.html');
    if (fs.existsSync(fallbackHtmlPath)) {
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).sendFile(fallbackHtmlPath);
    }

    res.status(500).send(`Kritischer Server-Fehler.\n${error.message}`);
  }
});

export default app;
