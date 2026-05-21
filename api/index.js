import path from 'path';
import { pathToFileURL } from 'url';

export default async function handler(req, res) {
  try {
    // 1. Wichtigste Core-Pakete explizit zur Laufzeit bereitstellen
    await import('@angular/compiler');

    const baseDir = process.cwd();
    const distFolder = path.join(baseDir, 'dist', 'elisabethkoch.eu');
    const serverModulePath = path.join(distFolder, 'server', 'main.server.mjs');
    const browserDistFolder = path.join(distFolder, 'browser');

    // Pfad für Angular setzen
    process.env['BROWSER_DIST_DIR'] = browserDistFolder;

    // Server-Bundle laden
    const moduleUrl = pathToFileURL(serverModulePath).href;
    const module = await import(moduleUrl);

    // Angular SSR Engine importieren
    const { CommonEngine } = await import('@angular/ssr');
    const engine = new CommonEngine();

    // Den standardmäßigen Bootstrap-Export holen
    const bootstrap = module.default || module.bootstrap;

    if (!bootstrap) {
      throw new Error(
        'Kein gültiger Bootstrap-Export in main.server.mjs gefunden.',
      );
    }

    // URL rekonstruieren
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = `${protocol}://${host}${req.url}`;

    // Rendern ausführen
    const html = await engine.render({
      bootstrap,
      documentFilePath: path.join(browserDistFolder, 'index.html'),
      url,
      publicPath: browserDistFolder,
    });

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    // 🌟 DIAGNOSE: Falls ein Modul fehlt, bricht Vercel nicht anonym ab,
    // sondern schreibt uns genau auf den Schirm, welche Datei vermisst wird!
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end(
      `Detaillierter Angular SSR Cloud-Fehler:\n${error.message}\n\nStack Trace:\n${error.stack}`,
    );
  }
}
