import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
  imports: [TranslateModule, CommonModule],
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
