import { Component, Input, OnInit } from "@angular/core"
import { TranslateService } from "@ngx-translate/core"

@Component({
  selector: "app-termine",
  templateUrl: "./termine.component.html",
  styleUrl: "./termine.component.scss",
})
export class TermineComponent implements OnInit {
  @Input() darkMode = true

  constructor(public translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang("de")

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use("en")
  }

  ngOnInit(): void {}
}
