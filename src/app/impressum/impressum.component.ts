import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss'],
  imports: [TranslateModule],
  providers: [TranslateService],
  standalone: true,
})
export class ImpressumComponent implements OnInit {
  constructor(private translate: TranslateService) {
    this.translate.use('en');
  }

  ngOnInit(): void {}
}
