import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-boxes-colour',
  templateUrl: './boxes-colour.component.html',
  styleUrl: './boxes-colour.component.scss',
})
export class BoxesColourComponent {
  text_1: string[];

  constructor(public translate: TranslateService) {
    this.translate
      .get('trainings.women.boxes.box_4.text_1')
      .subscribe((res: string[]) => {
        this.text_1 = res;
      });
  }
}
