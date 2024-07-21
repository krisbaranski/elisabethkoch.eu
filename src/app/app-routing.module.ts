import { NgModule } from "@angular/core"
import { RouterModule, Routes, ExtraOptions } from "@angular/router"
import { SlideshowComponent } from "./slideshow/slideshow.component"
import { HomeComponent } from "./home/home.component"
import { AboutmeComponent } from "./aboutme/aboutme.component"
import { ImpressumComponent } from "./impressum/impressum.component"
import { PrivacyComponent } from "./privacy/privacy.component"
import { ContactComponent } from "./contact/contact.component"
import { AppointmentHomeComponent } from "./appointment-home/appointment-home.component"
import { ProfileComponent } from "./profile/profile.component"

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "slideshow", component: SlideshowComponent },
  { path: "profile", component: ProfileComponent },
  { path: "appointment-home", component: AppointmentHomeComponent },
  { path: "contact", component: ContactComponent },
  { path: "impressum", component: ImpressumComponent },
  { path: "privacy", component: PrivacyComponent },
]

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: "enabled",
  anchorScrolling: "enabled",
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
