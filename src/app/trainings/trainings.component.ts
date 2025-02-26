import { Component } from '@angular/core';
import { NewsletterComponent } from '../newsletter/newsletter.component';
import { HeroComponent } from '../hero/hero.component';
import { BoxesTrainingComponent } from './boxes-training/boxes-training.component';
import { TestimonialComponent } from '../testimonial/testimonial.component';
import { SingleTrainingComponent } from './single-training/single-training.component';
import { SpacerComponent } from '../spacer/spacer.component';
import { WeWorkComponent } from './we-work/we-work.component';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss',
  standalone: true,
  imports: [
    HeroComponent,
    BoxesTrainingComponent,
    TestimonialComponent,
    SingleTrainingComponent,
    SpacerComponent,
    WeWorkComponent,
    NewsletterComponent,
  ],
})
export class TrainingsComponent {}
