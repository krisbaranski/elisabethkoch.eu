import { Component, Input, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrl: './women.component.scss',
})
export class WomenComponent {
  @Input() darkMode = true;
  private platformId = inject(PLATFORM_ID);

  constructor(private router: Router) {}

  goToPart(fragment: string) {
    const [path, anchor] = fragment.split('#');
    this.router.navigate([path], { fragment: anchor }).then(() => {
      // SSR SCHUTZSCHILD: Der Server bricht hier sofort ab!
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      // Erst im echten Browser läuft der Timer an:
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }
      }, 200);
    });
  }
}
