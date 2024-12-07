import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slideshow-me',
  templateUrl: './slideshow-me.component.html',
  styleUrls: ['./slideshow-me.component.scss'],
})
export class SlideshowMeComponent implements OnInit {
  constructor() {}
  images = ['aboutme2_bg.jpg'];
  text_big = ['profile.aboutme.name'];
  text_small = ['profile.aboutme.text_slide'];

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
    }, 200000);
  }
}
