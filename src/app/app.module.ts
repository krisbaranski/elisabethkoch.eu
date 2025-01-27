import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AboutmeComponent } from './profile/aboutme/aboutme.component';
import { AboutmeShortComponent } from './home/aboutme-short/aboutme-short.component';
import { AquaintmentComponent } from './contact/aquaintment/aquaintment.component';
import { BenefitsShortComponent } from './courses/women/benefits-short/benefits-short.component';
import { BoxesComponent } from './boxes/boxes.component';
import { BoxesHomeComponent } from './home/boxes-home/boxes-home.component';
import { BoxesWomenComponent } from './courses/women/boxes-women/boxes-women.component';
import { BoxesTrainingComponent } from './trainings/boxes-training/boxes-training.component';
import { ContactComponent } from './contact/contact.component';
import { ContactShortComponent } from './home/contact-short/contact-short.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesShortComponent } from './home/courses-short/courses-short.component';
import { CourseContentComponent } from './courses/women/course-content/course-content.component';
import { FactsComponent } from './profile/facts/facts.component';
import { FaqComponent } from './home/faq/faq.component';
import { FeedbacksComponent } from './home/feedbacks/feedbacks.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FirstAppointmentComponent } from './contact/first-appointment/first-appointment.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home/home.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { OfferComponent } from './offer/offer.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ProfileComponent } from './profile/profile.component';
import { SlideshowComponent } from './home/slideshow/slideshow.component';
import { SlideAboutmeComponent } from './profile/slide-aboutme/slide-aboutme.component';
import { SlideshowMeComponent } from './profile/slideshow-me/slideshow-me.component';
import { SingleTrainingComponent } from './trainings/single-training/single-training.component';
import { SpacerComponent } from './spacer/spacer.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { Tidycal30Component } from './contact/tidycal-30/tidycal-30.component';
import { Tidycal60Component } from './contact/tidycal-60/tidycal-60.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { TrainingsShortComponent } from './home/trainings-short/trainings-short.component';
import { WomenComponent } from './courses/women/women.component';
import { WorkComponent } from './profile/work/work.component';
import { WorkWomenComponent } from './courses/women/work-women/work-women.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AboutmeComponent,
    AboutmeShortComponent,
    AquaintmentComponent,
    BenefitsShortComponent,
    BoxesComponent,
    BoxesHomeComponent,
    BoxesWomenComponent,
    BoxesTrainingComponent,
    ContactComponent,
    ContactShortComponent,
    CourseContentComponent,
    CoursesComponent,
    CoursesShortComponent,
    FactsComponent,
    FaqComponent,
    FeedbacksComponent,
    FeedbackComponent,
    FirstAppointmentComponent,
    FooterComponent,
    HeaderComponent,
    HeroComponent,
    HomeComponent,
    HomeComponent,
    ImpressumComponent,
    OfferComponent,
    NewsletterComponent,
    NotFoundComponent,
    PrivacyComponent,
    ProfileComponent,
    SingleTrainingComponent,
    SlideAboutmeComponent,
    SlideshowMeComponent,
    SlideshowComponent,
    SpacerComponent,
    TestimonialComponent,
    Tidycal30Component,
    Tidycal60Component,
    TrainingsComponent,
    TrainingsShortComponent,
    WomenComponent,
    WorkComponent,
    WorkWomenComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  providers: [
    HttpClientModule,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
