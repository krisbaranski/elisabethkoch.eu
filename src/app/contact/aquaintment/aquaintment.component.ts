import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Tidycal30Component } from '../tidycal-30/tidycal-30.component';
import { HeroComponent } from '../../hero/hero.component';

@Component({
  selector: 'app-aquaintment',
  templateUrl: './aquaintment.component.html',
  styleUrl: './aquaintment.component.scss',
  imports: [Tidycal30Component, HeroComponent, CommonModule],
  standalone: true,
})
export class AquaintmentComponent {}
