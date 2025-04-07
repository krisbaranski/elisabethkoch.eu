import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-boxes-home',
  templateUrl: './boxes-home.component.html',
  styleUrl: './boxes-home.component.scss',
  imports: [TranslateModule],
})
export class BoxesHomeComponent {}
