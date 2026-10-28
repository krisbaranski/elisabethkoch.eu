import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-hero-analyse',
  templateUrl: './hero-analyse.component.html',
  styleUrl: './hero-analyse.component.scss',
})
export class HeroAnalyseComponent {
  @Input() text_1: string[] = [];

  constructor(public translate: TranslateService) {
    this.translate
      .stream('contact.analyse.text_1')
      .subscribe((res: string[]) => {
        this.text_1 = res;
      });
  }
}
