import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { SlideshowComponent } from "./slideshow/slideshow.component"
import { HomeComponent } from "./home/home.component"
import { AboutmeComponent } from "./aboutme/aboutme.component"
import { ImpressumComponent } from "./impressum/impressum.component"
import { PrivacyComponent } from "./privacy/privacy.component"
import { ContactComponent } from "./contact/contact.component"
import { AppointmentHomeComponent } from "./appointment-home/appointment-home.component"

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "slideshow", component: SlideshowComponent },
  { path: "aboutme", component: AboutmeComponent },
  { path: "appointment-home", component: AppointmentHomeComponent },
  { path: "contact", component: ContactComponent },
  { path: "impressum", component: ImpressumComponent },
  { path: "privacy", component: PrivacyComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
