import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.scss',
  imports: [TranslateModule],
  providers: [TranslateService],
  standalone: true,
})
export class CourseContentComponent {
  constructor() {}
}
