import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.scss',
  imports: [TranslateModule],
})
export class OfferComponent {}
