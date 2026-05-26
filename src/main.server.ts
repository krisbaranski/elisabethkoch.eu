import '@angular/compiler';
import { platformServer } from '@angular/platform-server';
import { AppModule } from './app/app.module';
import { ApplicationRef, NgModuleRef } from '@angular/core';

// Bootstrappt dein echtes AppModule direkt und gibt die von Vercel erwartete ApplicationRef zurück
export default function bootstrap(): Promise<ApplicationRef> {
  return platformServer([])
    .bootstrapModule(AppModule)
    .then((moduleRef: NgModuleRef<AppModule>) => {
      return moduleRef.injector.get(ApplicationRef);
    });
}
