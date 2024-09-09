import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-aboutme',

  templateUrl: './slide-aboutme.component.html',
  styleUrl: './slide-aboutme.component.scss',
})
export class SlideAboutmeComponent {
  images = ['me_green.png', 'me_orange.png'];
  headlines = ['', ''];
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
