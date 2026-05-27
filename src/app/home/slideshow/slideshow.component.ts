import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // <-- NEUEN IMPORT HINZUFÜGEN

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
})
export class SlideshowComponent implements OnInit {
  // 1. Angular Plattform-ID injizieren
  private platformId = inject(PLATFORM_ID);

  constructor() {}

  images = ['aboutme1.jpg'];
  text_big = 'home.title_1';
  headline = 'home.title_2';
  text_small = 'trainings.women.text_1';
  link = 'contact';

  currentImage = 0;
  showImage = true;

  ngOnInit() {
    this.updateImage();
  }

  updateImage() {
    // 2. ABSICHERUNG: Wenn wir auf dem Server (SSR) sind, brechen wir hier SOFORT ab!
    // Das unendliche setInterval wird auf dem Server NIEMALS gestartet.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Ab hier läuft der Code garantiert nur noch im echten Browser des Nutzers:
    setInterval(() => {
      this.currentImage++;
      this.currentImage = this.currentImage % this.images.length;
      this.showImage = false;

      setTimeout(() => {
        this.showImage = true;
      }, 15);
    }, 200000);
  }
}
