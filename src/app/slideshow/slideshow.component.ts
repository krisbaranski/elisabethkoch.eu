import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-slideshow',
    templateUrl: './slideshow.component.html',
    styleUrls: ['./slideshow.component.scss'],
    standalone: true,
})
export class SlideshowComponent implements OnInit {
  images = ['nature.png', 'sparcle.jpg', 'water.jpg'];
  headlines = [
    'bring your presence to the next level',
    'shine like a sun, emerge like a lion',
    'model your appearance strong and confindent',
  ];
  currentImage = 0;
  showImage = true;

  ngOnInit() {
    this.updateImage();
  }

  updateImage() {
    setInterval(() => {
      this.currentImage++;
      this.currentImage = this.currentImage % this.images.length;
      this.showImage = false;

      setTimeout(() => {
        this.showImage = true;
      }, 15);
    }, 8000);
  }
}
