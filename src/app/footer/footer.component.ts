import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; // <-- DIESER IMPORT HAT GEFEHLT!

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  currentYear: number;

  // 1. KORREKTUR: platformId korrekt für die Klasse deklarieren
  private platformId = inject(PLATFORM_ID);

  constructor(private router: Router) {
    this.currentYear = new Date().getFullYear();
  }

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

  ngOnInit(): void {}
}
