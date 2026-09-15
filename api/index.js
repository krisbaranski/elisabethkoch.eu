import '@angular/compiler';
import path from 'path';
import fs from 'fs';
import express from 'express';

const app = express();

const baseDir = process.cwd();
// 🌟 WICHTIG: Hier muss exakt 'dist/app' stehen!
const distFolder = path.join(baseDir, 'dist', 'app');
const browserDistFolder = path.join(distFolder, 'browser');
const serverDistFolder = path.join(distFolder, 'server');

app.use(express.static(browserDistFolder, { maxAge: '1y', index: false }));

// SITEMAP-BYPASS:
app.get('/sitemap.xml', (req, res) => {
  const sitemapPath = path.join(browserDistFolder, 'assets', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    res.setHeader('Content-Type', 'application/xml');
    return res.status(200).sendFile(sitemapPath);
  }
  res.status(404).send('Sitemap nicht gefunden.');
});

// SSR ROUTING:
app.all('*', async (req, res, next) => {
  try {
    const serverModulePath = path.join(serverDistFolder, 'main.server.mjs');
    const { reqHandler } = await import(serverModulePath);
    return reqHandler(req, res, next);
  } catch (error) {
    console.error('Fehler im SSR Handler:', error.message);

    const fallbackHtmlPath = path.join(browserDistFolder, 'index.html');
    if (fs.existsSync(fallbackHtmlPath)) {
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).sendFile(fallbackHtmlPath);
    }
    res.status(500).send(`Server-Fehler: ${error.message}`);
  }
});

export default app;
