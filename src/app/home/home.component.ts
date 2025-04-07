import { Component } from '@angular/core';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { BoxesHomeComponent } from './boxes-home/boxes-home.component';
import { TestimonialComponent } from '../testimonial/testimonial.component';
import { TrainingsShortComponent } from './trainings-short/trainings-short.component';
import { CoursesShortComponent } from './courses-short/courses-short.component';
import { SpacerComponent } from '../spacer/spacer.component';
import { AboutmeShortComponent } from './aboutme-short/aboutme-short.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { ContactShortComponent } from './contact-short/contact-short.component';
import { NewsletterComponent } from '../newsletter/newsletter.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    SlideshowComponent,
    BoxesHomeComponent,
    TestimonialComponent,
    TrainingsShortComponent,
    CoursesShortComponent,
    SpacerComponent,
    AboutmeShortComponent,
    FeedbacksComponent,
    ContactShortComponent,
    NewsletterComponent,
  ],
})
export class HomeComponent {}
