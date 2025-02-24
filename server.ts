import 'zone.js/node';
import express from 'express'; // ✅ Ensure this import is correct
import { existsSync } from 'fs';
import { join } from 'path';
import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import bootstrap from './src/main.server'; // ✅ Ensure this import is correct

const app = express();
const PORT = process.env['PORT'] || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// ✅ Correct setup for ngExpressEngine in Angular 15+
app.engine('html', ngExpressEngine({ bootstrap }));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

app.get('*', (req, res) => {
  const filePath = join(DIST_FOLDER, 'index.html');
  if (existsSync(filePath)) {
    res.render('index', { req });
  } else {
    res.status(404).send('Page not found');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
