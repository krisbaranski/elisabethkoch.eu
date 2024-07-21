import { Component, Input, OnInit, ViewChild } from "@angular/core"
import { TranslateService } from "@ngx-translate/core"
import { Router } from "@angular/router"
import { MatSidenav } from "@angular/material/sidenav"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @ViewChild("sidenav") sidenav: MatSidenav
  @Input() darkMode = true

  constructor(public translate: TranslateService, private router: Router) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang("en")

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use("de")
  }

  ngOnInit(): void {}

  goToPart(fragment: any) {
    this.router.navigateByUrl("profile#" + fragment)
  }

  onProfileClick(event: Event) {
    event.stopImmediatePropagation()
  }

  navigateAndClose(route: string) {
    // Navigate to the desired route
    this.router.navigate([route]).then(() => {
      // Close the sidebar after navigation is complete
      this.sidenav.close()
    })
  }
}
