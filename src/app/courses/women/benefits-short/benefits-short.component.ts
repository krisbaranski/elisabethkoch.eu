import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-benefits-short',
  templateUrl: './benefits-short.component.html',
  styleUrl: './benefits-short.component.scss',
  imports: [TranslateModule],
})
export class BenefitsShortComponent {
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
