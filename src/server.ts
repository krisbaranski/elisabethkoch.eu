import 'zone.js/node';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'fs';
import { join } from 'path';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');

  // Here, we now use the `AngularNodeAppEngine` instead of the `CommonEngine`
  const angularNodeAppEngine = new AngularNodeAppEngine();

  const app = express();
  const distFolder = join(process.cwd(), 'dist/elisabethkoch.eu/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index.html';

  // ✅ Add CSP headers before handling requests
  app.use((req, res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    );
    next();
  });

  // ✅ Serve static files
  app.use(express.static(distFolder, { maxAge: '1y' }));

  // ✅ Handle all routes
  app.get('*', (req, res) => {
    res.sendFile(join(distFolder, indexHtml));
  });

  // ✅ Start server
  app.listen(4000, () => {
    console.log(`Node Express server listening on http://localhost:4000`);
  });

  server.use('/api/**', (req, res) => res.json({ hello: 'foo' }));

  server.get(
    '**',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: 'index.html',
    })
  );

  // With this config, /404 will not reach the Angular app
  server.get('/404', (req, res, next) => {
    res.send('Express is serving this server only error');
  });

  server.get('**', (req, res, next) => {
    // Yes, this is executed in devMode via the Vite DevServer
    console.log('request', req.url, res.status);

    angularNodeAppEngine
      .handle(req, { server: 'express' })
      .then((response) =>
        response ? writeResponseToNodeResponse(response, res) : next()
      )
      .catch(next);
  });

  return server;
}

const server = app();
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:\${port}`);
  });
}

console.warn('Node Express server started');

// This exposes the RequestHandler
export const reqHandler = createNodeRequestHandler(server);
