import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss',
  imports: [TranslateModule],
})
export class FeedbackComponent {
  @Input() text: string;
  @Input() author: string;
  @Input() link: string;
  @Input() pagename: string;
}
