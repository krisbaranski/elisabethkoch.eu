// import { renderApplication } from '@angular/platform-server';
// import { AppComponent } from './app/app.component';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';
// import { provideServerRendering } from '@angular/platform-server';

// export default function render(): Promise<string> {
//   return renderApplication(AppComponent, {
//     appId: 'serverApp',
//     providers: [provideRouter(routes), provideServerRendering()],
//   });
// }

// import 'zone.js/node';
// import {
//   renderApplication,
//   provideServerRendering,
// } from '@angular/platform-server';
// import { AppComponent } from './app/app.component';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';
// import { provideHttpClient } from '@angular/common/http';
// import { importProvidersFrom } from '@angular/core';

// // 👉 Import your NgModules here:
// // import { SharedModule } from './app/shared/shared.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// export default function render(): Promise<string> {
//   return renderApplication(AppComponent, {
//     providers: [
//       provideServerRendering(),
//       provideHttpClient(),
//       provideRouter(routes),
//       importProvidersFrom(BrowserAnimationsModule),
//     ],
//   });
// }

// import { renderApplication } from '@angular/platform-server';
// import { provideServerRendering } from '@angular/platform-server';
// import { AppComponent } from './app/app.component';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';
// import { importProvidersFrom } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { TranslateModule } from '@ngx-translate/core';

// export default function render(): Promise<string> {
//   return renderApplication(AppComponent, {
//     appId: 'serverApp',
//     providers: [
//       provideRouter(routes),
//       provideServerRendering(),
//       importProvidersFrom(HttpClientModule, TranslateModule),
//     ],
//   });
// }

import 'zone.js/node';
import { renderApplication } from '@angular/platform-server';
import { provideServerRendering } from '@angular/platform-server';
import { importProvidersFrom } from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// 👇 Required factory for AoT
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export default function render(): Promise<string> {
  return renderApplication(
    () =>
      import('@angular/platform-browser').then((m) =>
        m.bootstrapApplication(AppComponent, {
          providers: [
            provideServerRendering(),
            provideHttpClient(withInterceptorsFromDi()),
            provideRouter(routes),
            provideAnimations(),
            importProvidersFrom(
              TranslateModule.forRoot({
                defaultLanguage: 'de',
                loader: {
                  provide: TranslateLoader,
                  useFactory: HttpLoaderFactory,
                  deps: [HttpClient],
                },
              })
            ),
          ],
        })
      ),
    {
      // Optional: Add options like document, url here if needed
    }
  );
}
