import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-courses-short',
  templateUrl: './courses-short.component.html',
  styleUrl: './courses-short.component.scss',
  imports: [TranslateModule],
  providers: [TranslateService],
  standalone: true,
})
export class CoursesShortComponent {
  constructor(private translate: TranslateService) {
    this.translate.use('en');
  }
}
