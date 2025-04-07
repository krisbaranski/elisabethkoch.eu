import { Component } from '@angular/core';
import { BoxesTrainingComponent } from './boxes-training/boxes-training.component';
import { SingleTrainingComponent } from './single-training/single-training.component';
import { WeWorkComponent } from './we-work/we-work.component';
import { HeroComponent } from '../hero/hero.component';
import { TestimonialComponent } from '../testimonial/testimonial.component';
import { SpacerComponent } from '../spacer/spacer.component';
import { NewsletterComponent } from '../newsletter/newsletter.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss',
  imports: [
    HeroComponent,
    BoxesTrainingComponent,
    TestimonialComponent,
    WeWorkComponent,
    SpacerComponent,
    SingleTrainingComponent,
    NewsletterComponent,
    TranslateModule,
  ],
})
export class TrainingsComponent {}
