import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.scss',
  imports: [TranslateModule],
  providers: [TranslateService],
  standalone: true,
})
export class FeedbacksComponent {
  constructor(private translate: TranslateService) {
    this.translate.use('en');
  }
}
