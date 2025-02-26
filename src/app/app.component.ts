import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {
  trigger,
  transition,
  style,
  animate,
  query,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        // Start state of new page
        query(':enter', [style({ opacity: 0 })], { optional: true }),
        // Leave the old page
        query(':leave', [animate('100ms ease-out', style({ opacity: 0 }))], {
          optional: true,
        }),
        // Enter the new page
        query(':enter', [animate('100ms ease-in', style({ opacity: 1 }))], {
          optional: true,
        }),
      ]),
    ]),
  ],
})
export class AppComponent {
  title: String = 'title name';

  // Transtale constructor
  constructor(
    public router: Router,
    public translate: TranslateService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('de');

    if (isPlatformBrowser(this.platformId)) {
      this.translate.setDefaultLang('en');
      this.translate.use('de');
    }
  }

  // Prepare the route animation between pages
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
