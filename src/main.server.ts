import 'zone.js/node';
import { renderApplication } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './main.config';

export function render(options: {
  document: string;
  url: string;
}): Promise<string> {
  return renderApplication(
    () => bootstrapApplication(AppComponent, appConfig),
    {
      document: options.document,
      url: options.url,
    }
  );
}
