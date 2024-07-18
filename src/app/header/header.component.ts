import { Component, Input, OnInit } from "@angular/core"
import { TranslateService } from "@ngx-translate/core"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() darkMode = true

  constructor(public translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang("en")

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use("de")
  }

  ngOnInit(): void {}
}
