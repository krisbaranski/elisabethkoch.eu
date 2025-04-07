import { Component } from '@angular/core';
import { HeroComponent } from '../../hero/hero.component';
import { Tidycal60Component } from '../tidycal-60/tidycal-60.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-first-appointment',
  templateUrl: './first-appointment.component.html',
  styleUrl: './first-appointment.component.scss',
  imports: [HeroComponent, Tidycal60Component, TranslateModule],
})
export class FirstAppointmentComponent {}
