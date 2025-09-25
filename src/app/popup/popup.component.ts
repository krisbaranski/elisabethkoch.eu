import { Component, OnInit } from '@angular/core';
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

  constructor(private dialog: MatDialog, private router: Router) {}

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
      }, 500); // Delay ensures content is loaded
    });
  }

  closePopup(): void {
    this.dialog.closeAll();
    localStorage.setItem(this.popupKey, 'true');
  }
}
