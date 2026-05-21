import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export default async function handler(req, res) {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    // ⚠️ CRITICAL: Replace 'YOUR_PROJECT_NAME' with your actual folder name inside dist/
    const distFolder = join(__dirname, '..', 'dist', 'elisabethkoch.eu');
    const serverModulePath = join(distFolder, 'server', 'main.server.mjs');

    // Dynamically load your main.server.mjs file
    const module = await import(serverModulePath);

    // Angular exports the app() function you found. We execute it here to get the Express instance:
    const angularExpressApp = module.app();

    // Pass the Vercel request and response directly into Angular's Express application
    return angularExpressApp(req, res);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Angular SSR Runtime Crash:\n${error.stack}`);
  }
}
