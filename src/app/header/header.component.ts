import {
  Component,
  OnInit,
  Input,
  ViewChild,
  HostListener,
} from '@angular/core';
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
  isSticky: boolean = false;
  isOpen: boolean = false;
  @Input() darkMode = true;
  previousScrollPosition: number = window.scrollY;
  currentLanguage: string;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollPosition = window.scrollY;

    // Check if user is scrolling down
    if (
      currentScrollPosition > this.previousScrollPosition &&
      currentScrollPosition > 300
    ) {
      this.isSticky = true; // Hide sticky menu when scrolling up
      this.isOpen = false;
    } else if (currentScrollPosition < 300) {
      this.isOpen = false;
    } else {
      this.isSticky = false; // Show sticky menu when scrolling down
      this.isOpen = true;
    }

    // Update the previous scroll position
    this.previousScrollPosition = currentScrollPosition;
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

  goToPart(fragment: string) {
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

  ngOnInit(): void {}
}
