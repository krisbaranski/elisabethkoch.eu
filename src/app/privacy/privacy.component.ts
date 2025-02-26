import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeroComponent } from '../hero/hero.component';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  imports: [HeroComponent, CommonModule, TranslateModule],
  providers: [TranslateService],
  standalone: true,
})
export class PrivacyComponent implements OnInit {
  constructor(private translate: TranslateService) {
    this.translate.use('en');
  }

  ngOnInit(): void {}
}
