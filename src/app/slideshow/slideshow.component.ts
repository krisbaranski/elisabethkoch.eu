import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
})
export class SlideshowComponent implements OnInit {
  constructor() {}
  images = ['nature.png', 'sparcle.jpg', 'water.jpg'];
  headlines = ['home.box_1', 'home.box_2', 'home.box_3'];
  text = ['home.slide_1', 'home.slide_2', 'home.slide_3'];

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
    }, 12000);
  }
}
