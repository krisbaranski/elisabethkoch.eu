import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-benefits-short',
  templateUrl: './benefits-short.component.html',
  styleUrl: './benefits-short.component.scss',
  imports: [TranslateModule],
  providers: [TranslateService],
  standalone: true,
})
export class BenefitsShortComponent {
  constructor() {}
}
