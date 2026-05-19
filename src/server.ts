import 'zone.js';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './main.server';

export function app(): express.Express {
  // Express korrekt initialisieren
  const server = (express as any).default
    ? (express as any).default()
    : express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(browserDistFolder, 'index.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // FIX FÜR NGX-TRANSLATE: Sprachdateien und Assets direkt als echte Dateien ausliefern
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
          inlineCriticalCss: false, // Verhindert asynchrone CSS-Hänger
          providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
        })
        .then((html: string) => {
          // RADIKALER FIX: Wenn das HTML da ist, senden wir es SOFORT an den Browser,
          // völlig egal, ob im Hintergrund noch unendliche Tasks laufen!
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

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();

  server.listen(Number(port), '127.0.0.1', () => {
    console.log(`Node Express server listening on http://127.0.0.1:${port}`);
  });
}

run();
