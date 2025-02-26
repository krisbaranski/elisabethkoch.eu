import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-we-work',
  templateUrl: './we-work.component.html',
  styleUrl: './we-work.component.scss',
  imports: [TranslateModule],
  providers: [TranslateService],
  standalone: true,
})
export class WeWorkComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('de');
  }
}
