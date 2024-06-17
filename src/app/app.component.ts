import { Component, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
})
export class AppComponent {
  title: String = 'title name';
  @Input() darkMode = true;

  constructor(public router: Router, public translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('de');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }
}
