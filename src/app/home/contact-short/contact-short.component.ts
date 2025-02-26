import { Component, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-short',
  templateUrl: './contact-short.component.html',
  styleUrl: './contact-short.component.scss',
  imports: [TranslateModule],
  providers: [TranslateService],
  standalone: true,
})
export class ContactShortComponent {
  constructor(private translate: TranslateService) {
    this.translate.use('en');
  }

  @Input() text_1: string;
  @Input() text_2: string;
}
