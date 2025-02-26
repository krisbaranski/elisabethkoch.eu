import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss'],
  imports: [TranslateModule],
  providers: [TranslateService],
  standalone: true,
})
export class AboutmeComponent {
  constructor(private translate: TranslateService) {
    this.translate.use('en');
  }
}
