import { platformServer } from '@angular/platform-server';
import { AppModule } from './app/app.module';
import { ApplicationRef } from '@angular/core';
import { NgModuleRef } from '@angular/core';

// Reines, fehlerfreies NgModule-Bootstrapping für die Angular CommonEngine
export default function bootstrap(): Promise<ApplicationRef> {
  return platformServer([])
    .bootstrapModule(AppModule)
    .then((moduleRef: NgModuleRef<AppModule>) => {
      return moduleRef.injector.get(ApplicationRef);
    });
}
