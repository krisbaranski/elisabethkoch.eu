import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

declare var ml_webform_success_22029023: any; // Reference global function

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
  imports: [TranslateModule],
  providers: [TranslateService],
  standalone: true,
})
export class NewsletterComponent {
  constructor(private translate: TranslateService) {
    this.translate.use('en');
  }
}
