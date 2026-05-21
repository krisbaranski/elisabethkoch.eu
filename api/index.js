import path from 'path';
import { pathToFileURL } from 'url';

export default async function handler(req, res) {
  try {
    const baseDir = process.cwd();
    const distFolder = path.join(baseDir, 'dist', 'elisabethkoch.eu');
    const serverModulePath = path.join(distFolder, 'server', 'main.server.mjs');
    const browserDistFolder = path.join(distFolder, 'browser');

    // WICHTIG: Pfad für die Angular CommonEngine setzen
    process.env['BROWSER_DIST_DIR'] = browserDistFolder;

    const moduleUrl = pathToFileURL(serverModulePath).href;
    const module = await import(moduleUrl);

    // 🌟 DER FIX: Wir rufen module.app() auf, um die Express-Instanz zu instanziieren.
    // Das verhindert den "Class constructor cannot be invoked without new"-Fehler.
    if (module.app) {
      const angularExpressApp = module.app();
      return angularExpressApp(req, res);
    } else if (module.reqHandler) {
      // Fallback für neuere Subversionen, falls reqHandler direkt exportiert wird
      return module.reqHandler(req, res);
    } else if (module.default) {
      return module.default(req, res);
    }

    throw new Error(
      'Kein gültiger Angular SSR Handler (app() oder reqHandler) im Server-Bundle gefunden.',
    );
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Angular Cloud-Boot Fehler:\n${error.stack}`);
  }
}
