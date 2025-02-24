import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrl: './faq.component.scss',
    standalone: false
})
export class FaqComponent {
  constructor(public translate: TranslateService) {}
}
