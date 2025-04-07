import { Component } from '@angular/core';
import { HeroComponent } from '../../hero/hero.component';
import { Tidycal30Component } from '../tidycal-30/tidycal-30.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-aquaintment',
  templateUrl: './aquaintment.component.html',
  styleUrl: './aquaintment.component.scss',
  imports: [HeroComponent, Tidycal30Component, TranslateModule],
})
export class AquaintmentComponent {}
