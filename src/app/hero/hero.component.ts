import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  imports: [TranslateModule, CommonModule],
  providers: [TranslateService],
  standalone: true,
})
export class HeroComponent {
  @Input() titleMedium = '';
  @Input() titleBig = '';
  @Input() text = '';
  @Input() link = '';
  @Input() button = '';
  @Input() showButton: boolean = true; // Control visibility

  constructor(private router: Router, private translate: TranslateService) {
    this.translate.use('en');
  }
}
