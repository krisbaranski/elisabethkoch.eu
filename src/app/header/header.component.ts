import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    TranslateModule,
  ],
})
export class HeaderComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  private isBrowser: boolean;
  isSticky: boolean = false;
  isOpen: boolean = false;
  previousScrollPosition: number = 0;
  currentLanguage: string;
  isSidenavOpen = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public translate: TranslateService,
    private router: Router,
    private overlayContainer: OverlayContainer
  ) {
    // Check if the current platform is the browser
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.previousScrollPosition = window.scrollY;
    }

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('de');

    this.currentLanguage = this.translate.currentLang || 'de'; // Default language
  }

  ngOnInit() {
    if (this.isBrowser && typeof window !== 'undefined') {
      console.log(window.location.href);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBrowser) {
      const currentScrollPosition = window.scrollY;

      // Check if user is scrolling down
      if (
        currentScrollPosition > this.previousScrollPosition &&
        currentScrollPosition > 81
      ) {
        this.isSticky = true; // Hide sticky menu when scrolling up
        this.isOpen = false;
      } else if (currentScrollPosition < 80) {
        this.isOpen = false;
      } else {
        this.isSticky = false; // Show sticky menu when scrolling down
        this.isOpen = true;
      }

      // Update the previous scroll position
      this.previousScrollPosition = currentScrollPosition;
    }
  }

  logHref() {
    if (this.isBrowser) {
      console.log(window.location.href);
    }
  }

  changeLanguage(lang: string) {
    if (this.isBrowser) {
      this.translate.use(lang);
      this.currentLanguage = lang;
    }
  }

  onSidenavOpened() {
    if (this.isBrowser) {
      this.isSidenavOpen = true;
    }
  }

  onSidenavClosed() {
    if (this.isBrowser) {
      this.isSidenavOpen = false;
    }
  }

  isActive(route: string): boolean {
    if (!this.isBrowser) {
      return false;
    }
    if (!this.router) {
      return false;
    }
    return this.router.url.startsWith(route);
  }

  goToPart(fragment: string) {
    if (this.isBrowser) {
      const [path, anchor] = fragment.split('#');
      this.router.navigate([path], { fragment: anchor }).then(() => {
        // Wait a short period for navigation to complete before trying to scroll
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
        // Close the sidebar after navigation is complete
        this.sidenav.close();
      });
    }
  }

  onSidemenuClick(event: Event) {
    if (this.isBrowser) {
      event.stopImmediatePropagation();
    }
  }

  navigateAndClose(route: string) {
    if (this.isBrowser) {
      // Navigate to the desired route
      this.router.navigate([route]).then(() => {
        // Close the sidebar after navigation is complete
        this.sidenav.close();
      });
    }
  }
}
