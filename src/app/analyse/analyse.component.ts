import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { first } from 'rxjs/operators'; // 🌟 NEUER IMPORT!

import { TranslateService } from '@ngx-translate/core';

// Sagt TypeScript, dass das TidyCal-Skript diese Funktion global bereitstellt
declare var iFrameResize: any;
@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrl: './analyse.component.scss',
})
export class AnalyseComponent implements AfterViewInit, OnDestroy {
  @Input() src = 'https://tidycal.com';

  @ViewChild('tidycalFrame', { static: false })
  tidycalFrame!: ElementRef<HTMLIFrameElement>;

  isBrowser: boolean = false;
  private platformId = inject(PLATFORM_ID);
  private resizerInstance: any = null;

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    if (this.tidycalFrame && this.tidycalFrame.nativeElement) {
      const iframeEl = this.tidycalFrame.nativeElement;

      iframeEl.onload = () => {
        // Prüfen, ob die Funktion vom TidyCal-Skript geladen wurde
        if (typeof iFrameResize === 'function') {
          this.resizerInstance = iFrameResize(
            {
              log: false,
              checkOrigin: false,
              minHeight: 580,
              heightCalculationMethod: 'lowestElement', // Reagiert auf Mobilgeräten deutlich dynamischer
            },
            iframeEl,
          );
        }
      };
    }
  }

  ngOnDestroy(): void {
    // Sauberes Entfernen der Instanz, falls vorhanden
    if (
      this.isBrowser &&
      this.resizerInstance &&
      this.resizerInstance[0]?.iFrameResizer
    ) {
      this.resizerInstance[0].iFrameResizer.close();
    }
  }
}
