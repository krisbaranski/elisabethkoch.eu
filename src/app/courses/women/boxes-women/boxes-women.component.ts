import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-boxes-women',
  templateUrl: './boxes-women.component.html',
  styleUrl: './boxes-women.component.scss',
})
export class BoxesWomenComponent {
  text_1: string[];

  constructor(public translate: TranslateService) {
    this.translate
      .get('trainings.women.boxes.box_4.text_1')
      .subscribe((res: string[]) => {
        this.text_1 = res;
      });
  }
}
