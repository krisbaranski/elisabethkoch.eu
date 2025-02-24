import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-testimonial',
    templateUrl: './testimonial.component.html',
    styleUrl: './testimonial.component.scss',
    standalone: false
})
export class TestimonialComponent {
  @Input() text: string;
  @Input() author: string;
}
