import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent {
  showPopup: boolean = false;
  readonly popupKey = 'popupDismissed';
  readonly autoCloseAfter = 4000; // auto-close after 10s
  private platformId = inject(PLATFORM_ID);

  constructor(
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.showPopup = true;

      setTimeout(() => {
        this.closePopup();
      }, this.autoCloseAfter);
    }, 4000);
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

  closePopup(): void {
    this.dialog.closeAll();
    localStorage.setItem(this.popupKey, 'true');
  }
}
