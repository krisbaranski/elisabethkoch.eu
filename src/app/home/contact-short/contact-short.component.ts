import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-contact-short',
  templateUrl: './contact-short.component.html',
  styleUrl: './contact-short.component.scss',
  imports: [TranslateModule],
})
export class ContactShortComponent {
  @Input() text_1: string;
  @Input() text_2: string;
}
