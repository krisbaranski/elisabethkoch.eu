import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-courses-short',
  templateUrl: './courses-short.component.html',
  styleUrl: './courses-short.component.scss',
    imports: [TranslateModule],
})
export class CoursesShortComponent {
  constructor() {}
}
