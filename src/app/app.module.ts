import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { HashLocationStrategy, LocationStrategy } from "@angular/common"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { SlideshowComponent } from "./slideshow/slideshow.component"
import { HeaderComponent } from "./header/header.component"
import { AboutmeComponent } from "./aboutme/aboutme.component"
import { WorkComponent } from "./work/work.component"
import { FactsComponent } from "./facts/facts.component"
import { ProfileComponent } from "./profile/profile.component"
import { FooterComponent } from "./footer/footer.component"
import { TermineComponent } from "./termine/termine.component"
import { HomeComponent } from "./home/home.component"
import { ImpressumComponent } from "./impressum/impressum.component"
import { PrivacyComponent } from "./privacy/privacy.component"
import { TranslateModule, TranslateLoader } from "@ngx-translate/core"
import { TranslateHttpLoader } from "@ngx-translate/http-loader"
import { HttpClientModule, HttpClient } from "@angular/common/http"
import { ContactComponent } from "./contact/contact.component"
import { AppointmentHomeComponent } from "./appointment-home/appointment-home.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatIconModule } from "@angular/material/icon"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatMenuModule } from "@angular/material/menu"

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json")
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SlideshowComponent,
    HeaderComponent,
    ProfileComponent,
    AboutmeComponent,
    WorkComponent,
    FactsComponent,
    FooterComponent,
    TermineComponent,
    ImpressumComponent,
    PrivacyComponent,
    ContactComponent,
    AppointmentHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: "en",
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
    MatMenuModule,
  ],
  providers: [
    HttpClientModule,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
