import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-boxes-women',
  templateUrl: './boxes-women.component.html',
  styleUrl: './boxes-women.component.scss',
  imports: [TranslateModule, CommonModule],
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
