import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { TestimonialComponent } from '../testimonial/testimonial.component';
import { WorkComponent } from './work/work.component';
import { EducationComponent } from './education/education.component';
import { NewsletterComponent } from '../newsletter/newsletter.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [
    HeroComponent,
    AboutmeComponent,
    TestimonialComponent,
    WorkComponent,
    EducationComponent,
    NewsletterComponent,
    TranslateModule,
  ],
})
export class ProfileComponent {}
