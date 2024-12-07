import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { FaqComponent } from './home/faq/faq.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trainings', component: TrainingsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'faq', component: FaqComponent },
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'disabled',
};

// const routerOptions: ExtraOptions = {
//   anchorScrolling: 'enabled',
//   scrollPositionRestoration: 'enabled',
// };

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
