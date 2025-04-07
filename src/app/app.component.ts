import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
} from '@angular/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RouterOutlet,
    RouterModule,
    TranslateModule,
  ],
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
  title: String = 'Elisabeth Koch - Stimme und gelungener Auftritt';

  // Transtale constructor
  constructor(
    public router: Router,
    public translate: TranslateService,
    private http: HttpClient
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('de');
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
