import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactComponent } from './contact/contact.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { AppointmentComponent } from './appointment/appointment.component';

const routes: Routes = [
  { path: '', component: SlideshowComponent },
  { path: 'aboutme', component: AboutmeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'privacy', component: PrivacyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
