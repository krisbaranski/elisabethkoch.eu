import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
// import { PopupComponent } from './popup/popup.component';
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
    private dialog: MatDialog,
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

  // ngOnInit(): void {
  //   setTimeout(() => {
  //     this.dialog.open(PopupComponent, {
  //       maxWidth: '400px',
  //       disableClose: true,
  //     });
  //   }, 4000);
  // }
}
