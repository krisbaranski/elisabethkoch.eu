import path from 'path';
import { pathToFileURL } from 'url';

export default async function handler(req, res) {
  try {
    // process.cwd() ist auf Vercel der absolut sicherste Weg, um ins Hauptverzeichnis zu springen
    const baseDir = process.cwd();
    const serverModulePath = path.join(
      baseDir,
      'dist',
      'elisabethkoch.eu',
      'server',
      'main.server.mjs',
    );
    const browserDistFolder = path.join(
      baseDir,
      'dist',
      'elisabethkoch.eu',
      'browser',
    );

    // WICHTIG: Pfad für die Angular CommonEngine setzen, damit Vorlagen geladen werden
    process.env['BROWSER_DIST_DIR'] = browserDistFolder;

    // file:// URL für Node-Cloud-Umgebungen generieren
    const moduleUrl = pathToFileURL(serverModulePath).href;
    const module = await import(moduleUrl);

    // Angular 17+ exportiert bei "ssr: true" direkt den fertigen reqHandler
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
    res.end(`Angular Cloud-Boot Fehler:\n${error.stack}`);
  }
}
