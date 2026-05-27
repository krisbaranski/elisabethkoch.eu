// ... (Dein oberer Express-Code bleibt völlig unverändert)

app.all('*', async (req, res) => {
  const documentFilePath = path.join(browserDistFolder, 'index.html');

  try {
    const serverModulePath = path.join(serverDistFolder, 'main.server.mjs');
    process.env['BROWSER_DIST_DIR'] = browserDistFolder;

    // 🌟 DYNAMIC CLOUD LOOKUP: Lädt das frisch korrigierte Server-Bundle direkt aus dem Task-RAM
    const moduleUrl = pathToFileURL(serverModulePath).href;
    const module = await import(moduleUrl);

    const bootstrap = module.default || module.bootstrap;
    if (!bootstrap) {
      throw new Error('Bootstrap-Export in main.server.mjs nicht gefunden.');
    }

    const { CommonEngine } = await import('@angular/ssr');
    const engine = new CommonEngine();

    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = `${protocol}://${host}${req.originalUrl}`;

    const indexHtmlContent = fs.readFileSync(documentFilePath, 'utf8');

    // 🚀 Ausführung über das stabilisierte Dokument-Feld
    const html = await engine.render({
      bootstrap,
      document: indexHtmlContent,
      url,
      publicPath: browserDistFolder,
      inlineCriticalCss: false,
    });

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
  } catch (error) {
    console.error(
      'SSR fehlgeschlagen, sende sicheren Client-Fallback:',
      error.message,
    );

    if (fs.existsSync(documentFilePath)) {
      const clientHtml = fs.readFileSync(documentFilePath, 'utf8');
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(clientHtml);
    }

    res.status(500).send(`Kritischer Fehler.\n${error.message}`);
  }
});

export default app;
