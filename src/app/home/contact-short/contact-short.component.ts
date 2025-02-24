import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-contact-short',
    templateUrl: './contact-short.component.html',
    styleUrl: './contact-short.component.scss',
    standalone: false
})
export class ContactShortComponent {
  @Input() text_1: string;
  @Input() text_2: string;
}
