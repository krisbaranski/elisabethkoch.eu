import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-trainings-short',
  templateUrl: './trainings-short.component.html',
  styleUrl: './trainings-short.component.scss',
  imports: [TranslateModule],
  providers: [TranslateService],
  standalone: true,
})
export class TrainingsShortComponent {
  constructor(private translate: TranslateService) {
    this.translate.use('en');
  }
}
