// import 'zone.js';
// export { AppServerModule as default } from './app/app.module.server';

import { platformServer } from '@angular/platform-server';
import { INITIAL_CONFIG } from '@angular/platform-server';
import { AppModule } from './app/app.module';

// Dieser Export liefert das typensichere Bootstrap-Signal für Vercels Node-Server
export default function bootstrap() {
  return platformServer([
    {
      provide: INITIAL_CONFIG,
      useValue: {
        doc: '<app-root></app-root>',
        url: '/',
      },
    },
  ]).bootstrapModule(AppModule);
}
