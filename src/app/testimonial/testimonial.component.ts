import { Component, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss',
  imports: [TranslateModule],
})
export class TestimonialComponent {
  @Input() text: string;
  @Input() author: string;
}
