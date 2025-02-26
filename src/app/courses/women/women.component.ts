import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HeroComponent } from 'src/app/hero/hero.component';
import { BoxesWomenComponent } from './boxes-women/boxes-women.component';
import { TestimonialComponent } from 'src/app/testimonial/testimonial.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { BenefitsShortComponent } from './benefits-short/benefits-short.component';
import { SpacerComponent } from 'src/app/spacer/spacer.component';
import { OfferComponent } from 'src/app/offer/offer.component';
import { FeedbacksComponent } from 'src/app/home/feedbacks/feedbacks.component';
import { ContactShortComponent } from 'src/app/home/contact-short/contact-short.component';
import { NewsletterComponent } from 'src/app/newsletter/newsletter.component';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrl: './women.component.scss',
  imports: [
    HeroComponent,
    BoxesWomenComponent,
    TestimonialComponent,
    CourseContentComponent,
    BenefitsShortComponent,
    SpacerComponent,
    OfferComponent,
    FeedbacksComponent,
    ContactShortComponent,
    NewsletterComponent,
  ],
  standalone: true,
})
export class WomenComponent {
  @Input() darkMode = true;

  constructor(private router: Router) {}

  goToPart(fragment: string) {
    const [path, anchor] = fragment.split('#');
    this.router.navigate([path], { fragment: anchor }).then(() => {
      // Wait a short period for navigation to complete before trying to scroll
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }
      }, 200); // Delay ensures content is loaded
    });
  }
}
