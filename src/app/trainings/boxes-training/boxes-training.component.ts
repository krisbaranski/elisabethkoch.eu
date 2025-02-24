import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-boxes-training',
    templateUrl: './boxes-training.component.html',
    styleUrl: './boxes-training.component.scss',
    standalone: false
})
export class BoxesTrainingComponent {
  text_1: string[];

  constructor(public translate: TranslateService) {
    this.translate
      .get('trainings.main.boxes_1.box_4.text_1')
      .subscribe((res: string[]) => {
        this.text_1 = res;
      });
  }
}
