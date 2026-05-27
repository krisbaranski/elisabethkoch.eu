import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // 🌟 WICHTIG FÜR SSR
import { HttpClient } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import {
  trigger,
  transition,
  style,
  animate,
  query,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter', [style({ opacity: 0 })], { optional: true }),
        query(':leave', [animate('100ms ease-out', style({ opacity: 0 }))], {
          optional: true,
        }),
        query(':enter', [animate('100ms ease-in', style({ opacity: 1 }))], {
          optional: true,
        }),
      ]),
    ]),
  ],
})
export class AppComponent {
  title: String = 'title name';

  constructor(
    public router: Router,
    public translate: TranslateService,
    private dialog: MatDialog,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object, // 🌟 Holt das Cloud-Erkennungs-Signal
  ) {
    // Standard-Fallbacks gelten für Server und Browser gleichermaßen
    translate.setDefaultLang('en');

    // 🛡️ DER CLOUD-SCHUTZ:
    if (isPlatformBrowser(this.platformId)) {
      // 🌐 BROWSER-ONLY: Erst beim Kunden im Browser laden wir die Sprache asynchron
      // über das Netzwerk nach. Das verhindert den unendlichen Zone.js-Hänger in der Cloud!
      this.translate.use('de');
    } else {
      // ☁️ SERVER-ONLY: Auf Vercel setzen wir die Sprache rein statisch im Speicher fest,
      // ohne asynchrone Netzwerk-Hintergrund-Tasks zu triggern.
      this.translate.currentLang = 'de';
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
