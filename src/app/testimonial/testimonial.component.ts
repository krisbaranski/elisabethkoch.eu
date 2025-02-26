import { Component, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss',
  imports: [TranslateModule],
  providers: [TranslateService],
  standalone: true,
})
export class TestimonialComponent {
  @Input() text: string;
  @Input() author: string;
  constructor(private translate: TranslateService) {
    this.translate.use('en');
  }
}
