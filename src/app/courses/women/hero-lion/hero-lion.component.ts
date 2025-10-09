import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-lion',
  templateUrl: './hero-lion.component.html',
  styleUrl: './hero-lion.component.scss',
})
export class HeroLionComponent {
  @Input() titleMedium = '';
  @Input() titleBig = '';
  @Input() text = '';
  @Input() link = '';
  @Input() button = '';
  @Input() showButton: boolean = true; // Control visibility

  constructor(private router: Router) {}

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
