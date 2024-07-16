import { Component, Input, OnInit } from "@angular/core"
import { TranslateService } from "@ngx-translate/core"

@Component({
  selector: "app-aboutme",
  templateUrl: "./aboutme.component.html",
  styleUrls: ["./aboutme.component.scss"],
})
export class AboutmeComponent implements OnInit {
  @Input() darkMode = true

  constructor(public translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang("de")

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use("en")
  }

  images = ["aboutme.jpg", "aboutme2.jpg"]
  images2 = ["bg-ochre.png", "bg-grey.png"]
  headlines = ["aboutme.slide_1", "aboutme.slide_2"]
  currentImage = 0
  showImage = true

  ngOnInit() {
    this.updateImage()
  }

  updateImage() {
    setInterval(() => {
      this.currentImage++
      this.currentImage = this.currentImage % this.images.length
      this.showImage = false

      setTimeout(() => {
        this.showImage = true
      }, 15)
    }, 8000)
  }
}
