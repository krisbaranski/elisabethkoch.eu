import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
  imports: [TranslateModule, CommonModule],
  providers: [TranslateService],
  standalone: true,
})
export class SlideshowComponent implements OnInit {
  constructor(private translate: TranslateService) {
    this.translate.use('en');
  }
  images = ['aboutme1.jpg'];
  text_big = ['home.title_1'];
  headline = ['home.title_2'];
  text_small = ['trainings.women.text_1'];
  // images = ['aboutme.jpg', 'stage.jpg', 'poem.png'];
  // text_big = ['home.slide_1', 'home.slide_2', 'home.slide_3'];
  // headline = ['home.box_1', 'home.box_2', 'home.box_3'];
  // text_small = ['home.text_1', 'home.text_2', 'home.text_3'];

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
