import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-single-training',
  templateUrl: './single-training.component.html',
  styleUrl: './single-training.component.scss',
  imports: [TranslateModule, CommonModule],
  providers: [TranslateService],
  standalone: true,
})
export class SingleTrainingComponent {
  text_1: string[];

  constructor(public translate: TranslateService) {
    this.translate
      .get('trainings.main.boxes_2.box_3.text_1')
      .subscribe((res: string[]) => {
        this.text_1 = res;
      });
  }
}
