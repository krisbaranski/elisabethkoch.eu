import 'zone.js/node';
import express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

const app = express();
const distFolder = join(process.cwd(), 'dist/elisabethkoch.eu/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html'))
  ? 'index.original.html'
  : 'index.html';

// ✅ Set Content Security Policy (CSP) Headers
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );
  next();
});

// ✅ Serve static files
app.use(express.static(distFolder, { maxAge: '1y' }));

// ✅ Handle SSR Requests
app.get('*', (req, res) => {
  res.sendFile(join(distFolder, indexHtml));
});

// ✅ Start Server
const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  console.log(`SSR Server is running at http://localhost:${port}`);
});
