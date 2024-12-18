import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlideshowComponent } from './home/slideshow/slideshow.component';
import { HeaderComponent } from './header/header.component';
import { AboutmeComponent } from './profile/aboutme/aboutme.component';
import { SlideAboutmeComponent } from './profile/slide-aboutme/slide-aboutme.component';
import { SlideshowMeComponent } from './profile/slideshow-me/slideshow-me.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { TestimonialWomenComponent } from './trainings/women/testimonial-women/testimonial-women.component';
import { WorkComponent } from './profile/work/work.component';
import { WorkWomenComponent } from './trainings/women/work-women/work-women.component';
import { FactsComponent } from './profile/facts/facts.component';
import { FaqComponent } from './home/faq/faq.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { TermineComponent } from './contact/termine/termine.component';
import { HomeComponent } from './home/home.component';
import { BoxesComponent } from './boxes/boxes.component';
import { BoxesHomeComponent } from './home/boxes-home/boxes-home.component';
import { BoxesWomenComponent } from './trainings/women/boxes-women/boxes-women.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { WomenComponent } from './trainings/women/women.component';
import { TrainingsShortComponent } from './trainings/trainings-short/trainings-short.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ContactComponent } from './contact/contact.component';
import { TidycalComponent } from './contact/tidycal/tidycal.component';
import { FormComponent } from './contact/form/form.component';
import { AppointmentHomeComponent } from './contact/appointment-home/appointment-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    HomeComponent,
    SlideshowComponent,
    HomeComponent,
    BoxesComponent,
    BoxesHomeComponent,
    BoxesWomenComponent,
    HeaderComponent,
    ProfileComponent,
    AboutmeComponent,
    SlideAboutmeComponent,
    SlideshowMeComponent,
    WorkComponent,
    WorkWomenComponent,
    TestimonialComponent,
    TestimonialWomenComponent,
    FactsComponent,
    FaqComponent,
    FooterComponent,
    FormComponent,
    TermineComponent,
    TrainingsComponent,
    WomenComponent,
    TrainingsShortComponent,
    ImpressumComponent,
    PrivacyComponent,
    ContactComponent,
    TidycalComponent,
    AppointmentHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
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
