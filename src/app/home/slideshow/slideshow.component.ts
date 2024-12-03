import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
})
export class SlideshowComponent implements OnInit {
  constructor(private router: Router) {}
  images = ['aboutme1.jpg'];
  text_big = ['home.slide_1'];
  headline = ['home.title_1'];
  text_small = ['home.text_1'];
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
      }, 200); // Delay ensures content is loaded
    });
  }
}
