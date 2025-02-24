import { bootstrapApplication } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/platform-server';
import { AppServerModule } from './app/app.server.module';

// ✅ Export bootstrap function for SSR
export default () =>
  bootstrapApplication(AppServerModule, {
    providers: [provideServerRendering()],
  });
