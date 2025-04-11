// import 'zone.js/node';
// import { createServer } from 'node:http';
// import { readFileSync, existsSync } from 'node:fs';
// import { join } from 'node:path';
// // import { render } from './src/main.server';
// // Paths
// const distFolder = join(__dirname, 'dist/elisabethkoch.eu/browser');
// const indexHtml = readFileSync(join(distFolder, 'index.html'), 'utf-8');
// const { render } = await import('./src/main.server.js');
// const PORT = process.env['PORT'] || 4000;
// // Import SSR render function
// // Ensure render is a function
// if (typeof render !== 'function') {
//   throw new Error(
//     'SSR render function not found in main.js. Expected default export of a function.'
//   );
// }
// // Create native HTTP server
// const server = createServer(async (req, res) => {
//   try {
//     const url = req.url || '/';
//     const html = await render({
//       document: indexHtml,
//       url,
//     });
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(html);
//   } catch (err) {
//     console.error('Error during SSR render:', err);
//     res.writeHead(500);
//     res.end('Internal Server Error');
//   }
// });
// // Start server
// server.listen(PORT, () => {
//   console.log(`✅ Node SSR server listening on http://localhost:${PORT}`);
// });
// server.ts (ESM compatible)
/// <reference types="node" />
import 'zone.js/node';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Dynamic import of SSR entry (because it's ESM too!)
const { render } = await import('./src/main.server.js');
const distFolder = join(__dirname, '../elisabethkoch.eu/browser');
const indexHtml = readFileSync(join(distFolder, 'index.html'), 'utf-8');
const server = createServer(async (req, res) => {
    try {
        const html = await render({
            document: indexHtml,
            url: req.url || '/',
        });
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    }
    catch (err) {
        console.error('SSR error:', err);
        res.writeHead(500);
        res.end('Internal Server Error');
    }
});
const PORT = process?.env?.['PORT'] ?? 4000;
server.listen(PORT, () => {
    console.log(`✅ SSR server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map