import '@angular/compiler';
import path from 'path';
import fs from 'fs';
import express from 'express';

// 🌟 DER VERCEL-PACKER-ZWANG: Durch diesen statischen Import weiß der Vercel-Compiler,
// dass er das Server-Bundle und den dist-Ordner ZWINGEND in den Cloud-Container einpacken muss!
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

    // Nutzt das statisch geladene Bundle (umgeht den fehlerhaften dynamischen Cloud-Import)
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
