import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-tidycal-30',
  templateUrl: './tidycal-30.component.html',
  styleUrl: './tidycal-30.component.scss',
})
export class Tidycal30Component implements AfterViewInit {
  @ViewChild('tidycalFrame', { static: true })
  tidycalFrame!: ElementRef<HTMLIFrameElement>;

  private lastHeight = 0;
  private pollingIntervalId: any;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.listenForPostMessages();
    this.startHeightPollingFallback();
  }

  private listenForPostMessages(): void {
    window.addEventListener('message', (event: MessageEvent) => {
      if (
        typeof event.data === 'string' &&
        event.data.includes('booking-form')
      ) {
        this.scrollToIframe();
      }
    });
  }

  private startHeightPollingFallback(): void {
    this.ngZone.runOutsideAngular(() => {
      this.pollingIntervalId = setInterval(() => {
        const iframe = this.tidycalFrame.nativeElement;
        const newHeight = iframe.clientHeight;

        if (newHeight > this.lastHeight + 200) {
          this.scrollToIframe();
        }

        this.lastHeight = newHeight;
      }, 1000);
    });
  }

  private scrollToIframe(): void {
    this.tidycalFrame.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  ngOnDestroy(): void {
    if (this.pollingIntervalId) {
      clearInterval(this.pollingIntervalId);
    }
  }
}
