import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [TranslateModule, RouterLink],
  providers: [TranslateService],
  standalone: true,
})
export class FooterComponent implements OnInit {
  currentYear: number;
  currentLanguage: string;

  constructor(
    public translate: TranslateService,
    private router: Router,
    private overlayContainer: OverlayContainer
  ) {
    this.currentYear = new Date().getFullYear();

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('de');

    this.currentLanguage = this.translate.currentLang || 'de'; // Default language
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

  ngOnInit(): void {}
}
