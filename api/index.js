import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export default async (req, res) => {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    // ⚠️ CRITICAL: Replace 'YOUR_PROJECT_NAME' with your folder name inside dist/
    const distFolder = join(__dirname, '..', 'dist', 'elisabethkoch.eu');
    const serverModulePath = join(distFolder, 'server', 'main.server.mjs');

    // Dynamically inject the runtime path variable so Angular can find its index files
    process.env['BROWSER_DIST_DIR'] = join(distFolder, 'browser');

    const { reqHandler } = await import(serverModulePath);
    return reqHandler(req, res);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`SSR Server Error Trace:\n${error.stack}`);
  }
};
