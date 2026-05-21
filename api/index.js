import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

export default async function handler(req, res) {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    // Absoluter Pfad zu deinem Projektordner
    const distFolder = join(__dirname, '..', 'dist', 'elisabethkoch.eu');
    const serverModulePath = join(distFolder, 'server', 'main.server.mjs');

    // Node.js file:// URL Format für dynamische Cloud-Imports erzeugen
    const moduleUrl = pathToFileURL(serverModulePath).href;
    const module = await import(moduleUrl);

    // WICHTIG: Setze die Pfade für die Angular CommonEngine
    process.env['BROWSER_DIST_DIR'] = join(distFolder, 'browser');

    // 🌟 DER FIX: Angular 17+ exportiert direkt den lauffähigen reqHandler oder die app-Funktion.
    // Wir prüfen beide Varianten, um Flexibilität zu garantieren:
    if (module.reqHandler) {
      return module.reqHandler(req, res);
    } else if (module.app) {
      const angularExpressApp = module.app();
      return angularExpressApp(req, res);
    } else if (module.default) {
      return module.default(req, res);
    }

    throw new Error(
      'Kein gültiger Angular SSR Handler im Server-Bundle gefunden.',
    );
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Angular SSR Cloud Crash Trace:\n${error.stack}`);
  }
}
