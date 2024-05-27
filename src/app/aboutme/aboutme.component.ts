import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss'],
})
export class AboutmeComponent implements OnInit {
  @Input() darkMode = true;
  images = ['aboutme.jpg', 'aboutme2.jpg'];
  images2 = ['bg-ochre.png', 'bg-grey.png'];
  headlines = ['your professional coaching', 'brings you to the top'];
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
