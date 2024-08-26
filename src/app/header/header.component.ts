import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isShrink: boolean = false;
  currentLanguage: string;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isShrink = window.scrollY > 50000;
  }

  constructor(public translate: TranslateService, private router: Router) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('de');

    this.currentLanguage = this.translate.currentLang || 'de'; // Default language
  }
  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLanguage = lang;
  }

  // goToPart(fragment: string) {
  //   // Assuming the fragment parameter contains only the part after #
  //   this.router.navigateByUrl(fragment);
  //   this.sidenav.close();
  // }

  goToPart(fragment: string) {
    switch (fragment) {
      case 'profile':
        this.router.navigateByUrl('profile#' + fragment);
        break;
      case 'trainings':
        this.router.navigateByUrl('trainings#' + fragment);
        break;
      default:
        this.router.navigateByUrl(fragment);
    }
    this.sidenav.close();
  }

  onProfileClick(event: Event) {
    event.stopImmediatePropagation();
  }

  navigateAndClose(route: string) {
    // Navigate to the desired route
    this.router.navigate([route]).then(() => {
      // Close the sidebar after navigation is complete
      this.sidenav.close();
    });
  }

  ngOnInit(): void {}
}
