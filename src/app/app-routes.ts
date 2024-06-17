import { Routes } from '@angular/router';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactComponent } from './contact/contact.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { AppointmentHomeComponent } from './appointment-home/appointment-home.component';

export const routes: Routes = [
  { path: '', component: SlideshowComponent },
  { path: 'aboutme', component: AboutmeComponent },
  { path: 'appointment-home', component: AppointmentHomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'privacy', component: PrivacyComponent },
];
