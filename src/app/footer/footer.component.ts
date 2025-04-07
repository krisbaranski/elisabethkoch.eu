import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [TranslateModule, RouterModule],
})
export class FooterComponent implements OnInit {
  currentYear: number;

  constructor(private router: Router) {
    this.currentYear = new Date().getFullYear();
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

  ngOnInit(): void {}
}
