import { Component } from '@angular/core';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-we-work',
  templateUrl: './we-work.component.html',
  styleUrl: './we-work.component.scss',
  imports: [TranslateModule],
})
export class WeWorkComponent {
  constructor() {}
}
