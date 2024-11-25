import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { TranslateService } from "@ngx-translate/core"

@Component({
  selector: "app-work",
  templateUrl: "./work.component.html",
  styleUrl: "./work.component.scss",
})
export class WorkComponent {
  text_7: string[]
  text_8: string[]

  constructor(public router: Router, public translate: TranslateService) {
    this.translate.get("work.text_7").subscribe((res: string[]) => {
      this.text_7 = res
    })

    this.translate.get("work.text_8").subscribe((res: string[]) => {
      this.text_8 = res
    })
  }
}
