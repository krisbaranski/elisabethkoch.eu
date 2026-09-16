import { Component, Input } from '@angular/core';
import { first } from 'rxjs/operators'; // 🌟 NEUER IMPORT!
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero-coop',
  templateUrl: './hero-coop.component.html',
  styleUrl: './hero-coop.component.scss',
})
export class HeroCoopComponent {
  @Input() link = '';
  @Input() button = '';
  @Input() showButton: boolean = true; // Control visibility

  constructor(private router: Router) {}
}

// goToPart(fragment: string) {
//   const [path, anchor] = fragment.split('#');
//   this.router.navigate([path], { fragment: anchor }).then(() => {
//     // Wait a short period for navigation to complete before trying to scroll
//     setTimeout(() => {
//       const element = document.getElementById(anchor);
//       if (element) {
//         element.scrollIntoView({
//           behavior: 'smooth',
//           block: 'start',
//           inline: 'nearest',
//         });
//       }
//     }, 200); // Delay ensures content is loaded
//   });
