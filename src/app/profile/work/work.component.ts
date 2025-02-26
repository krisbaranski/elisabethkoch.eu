import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
  imports: [TranslateModule],
  providers: [TranslateService],
  standalone: true,
})
export class WorkComponent {
  constructor(private translate: TranslateService) {
    this.translate.use('en');
  }
}
