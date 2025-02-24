import { bootstrapApplication } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/platform-server';
import { AppServerModule } from './app/app.server.module';

// ✅ Correctly export bootstrap function
export default () =>
  bootstrapApplication(AppServerModule, {
    providers: [provideServerRendering()],
  });
