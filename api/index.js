import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

export default async function handler(req, res) {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    // Absoluter Pfad zu deinem Projektordner
    const distFolder = join(__dirname, '..', 'dist', 'elisabethkoch.eu');
    const serverModulePath = join(distFolder, 'server', 'main.server.mjs');

    // WICHTIG: Überschreibe die Umgebungsvariablen, damit Angular
    // seine Vorlagen-HTML-Dateien im Vercel-System findet
    process.env['BROWSER_DIST_DIR'] = join(distFolder, 'browser');

    // Erzeuge eine gültige file://-URL für den dynamischen Cloud-Import
    const moduleUrl = pathToFileURL(serverModulePath).href;
    const module = await import(moduleUrl);

    // Angular 17+ exportiert bei standardmäßigem "ssr: true" direkt den reqHandler.
    // Falls das Projekt eine ältere Struktur hat, nutzen wir den Fallback auf module.app()
    if (module.reqHandler) {
      return module.reqHandler(req, res);
    } else if (module.app) {
      return module.app(req, res);
    } else {
      // Wenn es ein direkter Express-Export ist
      return module.default(req, res);
    }
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Angular SSR Cloud Crash Trace:\n${error.stack}`);
  }
}
