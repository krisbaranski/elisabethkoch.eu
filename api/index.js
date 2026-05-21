import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export default async (req, res) => {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    // ⚠️ REPLACE 'YOUR_PROJECT_NAME' with your actual directory name inside dist/
    const serverModulePath = join(
      __dirname,
      '../dist/elisabethkoch.eu/server/main.server.mjs',
    );

    const { reqHandler } = await import(serverModulePath);
    return reqHandler(req, res);
  } catch (error) {
    res.statusCode = 500;
    res.end(`SSR Bootstrap Failure: ${error.message}`);
  }
};
