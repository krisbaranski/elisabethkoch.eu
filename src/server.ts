import 'zone.js';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './main.server';

export function app(): express.Express {
  const server = (express as any).default
    ? (express as any).default()
    : express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(browserDistFolder, 'index.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Sprachdateien und Assets direkt als echte Dateien ausliefern
  server.use(
    '/assets',
    express.static(join(browserDistFolder, 'assets'), {
      maxAge: '1y',
      fallthrough: false,
    }),
  );

  // Allgemeine statische Client-Dateien (main.js, styles.css etc.)
  server.get(
    '**/*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    }),
  );

  // Alle regulären Routen über die Angular-Engine rendern
  server.get(
    '**',
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      const { protocol, originalUrl, baseUrl, headers } = req;

      commonEngine
        .render({
          bootstrap,
          documentFilePath: indexHtml,
          url: `${protocol}://${headers.host}${originalUrl}`,
          publicPath: browserDistFolder,
          inlineCriticalCss: false,
          providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
        })
        .then((html: string) => {
          res.send(html);
        })
        .catch((err: any) => {
          console.error('[SSR Render Error] Fehler beim Vorrendern:', err);
          res.sendFile(indexHtml); // Im Fehlerfall sicherer Fallback auf Client-Rendering
        });
    },
  );

  return server;
}

// 🌟 VERCEL RUNTIME MODULATION:
// Wir starten server.listen() NUR, wenn wir lokal testen (wo process.env['VERCEL'] fehlt).
// In der Cloud übernimmt Vercels Serverless Function das Kommando vollautomatisch!
if (!process.env['VERCEL']) {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(Number(port), '127.0.0.1', () => {
    console.log(
      `Lokaler Node Express server läuft auf http://127.0.0.1:${port}`,
    );
  });
}
