import 'zone.js/node';
import '@angular/compiler';
import { enableProdMode, ApplicationRef, NgModuleRef } from '@angular/core';
import { platformServer } from '@angular/platform-server';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// 🌟 DER TYPEN-FIX: Wir extrahieren die 'ApplicationRef' aus dem NgModuleRef,
// damit das Versprechen exakt dem Typen-Interface der CommonEngine entspricht!
const bootstrap = () =>
  platformServer([])
    .bootstrapModule(AppModule)
    .then((moduleRef: NgModuleRef<AppModule>) => {
      return moduleRef.injector.get(ApplicationRef);
    });

export default bootstrap;
