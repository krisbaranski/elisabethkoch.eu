import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  text_1: string[];

  constructor(public translate: TranslateService) {
    this.translate
      .get('profile.work.boxes.text_1')
      .subscribe((res: string[]) => {
        this.text_1 = res;
      });
  }
}
