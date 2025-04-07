import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-trainings-short',
  templateUrl: './trainings-short.component.html',
  styleUrl: './trainings-short.component.scss',
  imports: [TranslateModule],
})
export class TrainingsShortComponent {
  constructor() {}
}
