import {
  Component,
  OnInit,
  Input,
  ViewChild,
  HostListener,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSticky: boolean = false;
  isOpen: boolean = false;
  @Input() darkMode = true;
  previousScrollPosition: number = 0; // Sicherer Standardwert für den Server
  currentLanguage: string;
  isSidenavOpen = false;

  // Angular Plattform-ID injizieren
  private platformId = inject(PLATFORM_ID);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Abbrechen, wenn der Code auf dem Server ausgeführt wird
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const currentScrollPosition = window.scrollY;

    // Check if user is scrolling down
    if (
      currentScrollPosition > this.previousScrollPosition &&
      currentScrollPosition > 201
    ) {
      this.isSticky = true; // Hide sticky menu when scrolling up
      this.isOpen = false;
    } else if (currentScrollPosition < 200) {
      this.isOpen = false;
    } else {
      this.isSticky = false; // Show sticky menu when scrolling down
      this.isOpen = true;
    }

    // Update the previous scroll position
    this.previousScrollPosition = currentScrollPosition;
  }

  constructor(
    public translate: TranslateService,
    private router: Router,
    private overlayContainer: OverlayContainer
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('de');

    this.currentLanguage = this.translate.currentLang || 'de'; // Default language
  }

  ngOnInit(): void {
    // Erst hier – und nur im echten Browser – holen wir uns die echte Scroll-Position
    if (isPlatformBrowser(this.platformId)) {
      this.previousScrollPosition = window.scrollY;
    } else {
      this.previousScrollPosition = 0; // Sicherer Standardwert für den Server
    }
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLanguage = lang;
  }

  onSidenavOpened() {
    this.isSidenavOpen = true;
  }

  onSidenavClosed() {
    this.isSidenavOpen = false;
  }

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }

  goToPart(fragment: string) {
    const [path, anchor] = fragment.split('#');
    this.router.navigate([path], { fragment: anchor }).then(() => {
      // Wait a short period for navigation to complete before trying to scroll
      this.router.navigate([path], { fragment: anchor }).then(() => {
        if (!isPlatformBrowser(this.platformId)) {
          return;
        }
        setTimeout(() => {
          const element = document.getElementById(anchor);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            });
          }
        }, 200); // Delay ensures content is loaded
      });
    });
  }

  onSidemenuClick(event: Event) {
    event.stopImmediatePropagation();
  }

  navigateAndClose(route: string) {
    // Navigate to the desired route
    this.router.navigate([route]).then(() => {
      // Close the sidebar after navigation is complete
      this.sidenav.close();
    });
  }
}
