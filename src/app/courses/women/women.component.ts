import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HeroComponent } from '../../hero/hero.component';
import { BoxesWomenComponent } from './boxes-women/boxes-women.component';
import { TestimonialComponent } from '../../testimonial/testimonial.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { BenefitsShortComponent } from './benefits-short/benefits-short.component';
import { SpacerComponent } from '../../spacer/spacer.component';
import { OfferComponent } from '../../offer/offer.component';
import { FeedbacksComponent } from '../../home/feedbacks/feedbacks.component';
import { ContactShortComponent } from '../../home/contact-short/contact-short.component';
import { NewsletterComponent } from '../../newsletter/newsletter.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
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
    TranslateModule,
  ],
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
