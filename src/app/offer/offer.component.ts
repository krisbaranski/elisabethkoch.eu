import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.scss',
  imports: [TranslateModule],
  providers: [TranslateService],
  standalone: true,
})
export class OfferComponent {
  constructor(private translate: TranslateService) {
    this.translate.use('en');
  }
}
