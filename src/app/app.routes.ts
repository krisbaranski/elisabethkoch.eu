import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { CoursesComponent } from './courses/courses.component';
import { ProfileComponent } from './profile/profile.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WomenComponent } from './courses/women/women.component';
import { AquaintmentComponent } from './contact/aquaintment/aquaintment.component';
import { FirstAppointmentComponent } from './contact/first-appointment/first-appointment.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
  {
    path: 'trainings',
    component: TrainingsComponent,
    data: { animation: 'TrainingsPage' },
  },
  {
    path: 'courses',
    component: CoursesComponent,
    children: [{ path: 'women', component: WomenComponent }],
    data: { animation: 'CoursesPage' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { animation: 'ProfilePage' },
  },
  { path: 'blog', component: BlogComponent, data: { animation: 'BlogPage' } },
  {
    path: 'contact',
    component: ContactComponent,
    children: [
      { path: 'aquaintment', component: AquaintmentComponent },
      { path: 'first-appointment', component: FirstAppointmentComponent },
    ],
    data: { animation: 'ContactPage' },
  },
  {
    path: 'impressum',
    component: ImpressumComponent,
    data: { animation: 'ImpressumPage' },
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    data: { animation: 'PrivacyPage' },
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { animation: 'NotFoundPage' },
  },
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'disabled',
};
