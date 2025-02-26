import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-aboutme-short',
  templateUrl: './aboutme-short.component.html',
  styleUrls: ['./aboutme-short.component.scss'],
  imports: [TranslateModule],
  providers: [TranslateService],
  standalone: true,
})
export class AboutmeShortComponent {
  constructor(private translate: TranslateService) {
    this.translate.use('en');
  }
}
