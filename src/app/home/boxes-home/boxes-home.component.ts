import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-boxes-home',
  templateUrl: './boxes-home.component.html',
  styleUrl: './boxes-home.component.scss',
  imports: [TranslateModule],
  providers: [TranslateService],
  standalone: true,
})
export class BoxesHomeComponent {
  constructor(private translate: TranslateService) {
    this.translate.use('en');
  }
}
