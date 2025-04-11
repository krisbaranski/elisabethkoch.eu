import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  styleUrl: './facts.component.scss',
  imports: [CommonModule, TranslateModule],
})
export class FactsComponent {
  text_2: string[];
  text_3: string[];
  text_4: string[];

  constructor(public router: Router, public translate: TranslateService) {
    this.translate.get('profile.facts.text_2').subscribe((res: string[]) => {
      this.text_2 = res;
    });

    this.translate.get('profile.facts.text_3').subscribe((res: string[]) => {
      this.text_3 = res;
    });

    this.translate.get('profile.facts.text_4').subscribe((res: string[]) => {
      this.text_4 = res;
    });
  }
}
