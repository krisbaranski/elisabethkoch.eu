import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-short',

  templateUrl: './contact-short.component.html',
  styleUrl: './contact-short.component.scss',
})
export class ContactShortComponent {
  constructor() {}
  @Input() text_1: string;
  @Input() text_2: string;
  link = ['contact'];
}
