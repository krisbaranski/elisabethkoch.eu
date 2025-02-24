import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrl: './feedback.component.scss',
    standalone: false
})
export class FeedbackComponent {
  @Input() text: string;
  @Input() author: string;
  @Input() link: string;
  @Input() pagename: string;
}
