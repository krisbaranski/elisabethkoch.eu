import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrl: './boxes.component.scss',
  imports: [TranslateModule],
  standalone: true,
})
export class BoxesComponent {}
