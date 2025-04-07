import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  imports: [HeroComponent, TranslateModule],
})
export class PrivacyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
