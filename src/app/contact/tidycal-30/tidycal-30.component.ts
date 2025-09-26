import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-tidycal-30',
  templateUrl: './tidycal-30.component.html',
  styleUrl: './tidycal-30.component.scss',
})
export class Tidycal30Component implements AfterViewInit, OnDestroy {
  @Input() src = 'https://tidycal.com/elisabethkoch/30-minute-meeting'; // pass your tidycal url
  @Input() initialHeight = 1500; // px for desktop/default
  @Input() expandedHeightMobile = 1800; // px — larger to reveal booking form on mobile
  @Input() scrollOffset = 20; // offset from top when scrolling

  @ViewChild('tidycalFrame', { static: false })
  tidycalFrame!: ElementRef<HTMLIFrameElement>;

  private messageListener = (e: MessageEvent) => this.onMessage(e);
  private pointerListenerUnsub?: () => void;
  private clickListenerUnsub?: () => void;
  private resizeListenerUnsub?: () => void;
  private expanded = false;
  showManualButton = false;

  constructor(private renderer: Renderer2, private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    // Set initial height based on device
    const isMobile = this.isMobile();
    const initial = isMobile
      ? Math.max(this.initialHeight, window.innerHeight)
      : this.initialHeight;
    this.setIframeHeight(initial);

    // Listen for postMessage events (best/clean solution if tidycal supports it)
    window.addEventListener('message', this.messageListener, false);

    // Listen for pointer events on the iframe (user interaction inside iframe)
    // We attach listener after view init to ensure tidycalFrame exists.
    if (this.tidycalFrame && this.tidycalFrame.nativeElement) {
      // pointerup covers mouse and touch; also attach touchend as safety
      this.pointerListenerUnsub = this.renderer.listen(
        this.tidycalFrame.nativeElement,
        'pointerup',
        () => this.onIframeUserInteraction()
      );
      this.clickListenerUnsub = this.renderer.listen(
        this.tidycalFrame.nativeElement,
        'touchend',
        () => this.onIframeUserInteraction()
      );
    }

    // If orientation/viewport changes, recompute sizes
    this.ngZone.runOutsideAngular(() => {
      this.resizeListenerUnsub = this.renderer.listen(
        'window',
        'resize',
        () => {
          if (!this.expanded && this.isMobile()) {
            this.setIframeHeight(
              Math.max(this.initialHeight, window.innerHeight)
            );
          }
        }
      );
    });
  }

  private onMessage(event: MessageEvent) {
    // Be conservative: ignore messages that are not strings
    try {
      const data = event.data;
      if (!data) return;

      // heuristics: many widgets send booking-related strings; adapt if necessary
      const asString = typeof data === 'string' ? data : JSON.stringify(data);
      const lower = asString.toLowerCase();

      if (
        lower.includes('booking') ||
        lower.includes('form') ||
        lower.includes('submit')
      ) {
        // TidyCal form likely opened
        this.expandAndScroll('postmessage');
      }
    } catch (err) {
      // ignore parse errors
    }
  }

  private onIframeUserInteraction() {
    // Called when user taps/clicks inside the iframe area.
    // Wait a short time (widget may navigate internally) then expand & scroll.
    // Small delay helps give the widget time to change view.
    setTimeout(() => {
      // Expand on mobile so inner form is visible without inner scrolling
      if (this.isMobile() && !this.expanded) {
        this.expandAndScroll('interaction');
      } else {
        // On desktop maybe we only need to scroll
        this.scrollToIframeTop();
      }
    }, 600); // 600ms is a good compromise on mobile devices
  }

  private expandAndScroll(reason: string) {
    // Expand iframe height (only once)
    if (!this.tidycalFrame || !this.tidycalFrame.nativeElement) return;

    if (this.isMobile()) {
      // Expand to a large height to reveal the lower form content inside the iframe.
      const target = Math.max(
        this.expandedHeightMobile,
        window.innerHeight * 1.6
      );
      this.setIframeHeight(target);
      this.expanded = true;
    }

    this.scrollToIframeTop();

    // If expansion doesn't work for some reason, show manual button
    // showManualButton gives user a reliable fallback
    this.showManualButton = true;
    console.debug(`[TidyCalEmbed] expandAndScroll triggered by ${reason}`);
  }

  private setIframeHeight(px: number) {
    if (!this.tidycalFrame || !this.tidycalFrame.nativeElement) return;
    const el = this.tidycalFrame.nativeElement;
    el.style.height = px + 'px';
  }

  private scrollToIframeTop(): void {
    if (!this.tidycalFrame) return;

    const iframeEl = this.tidycalFrame.nativeElement;
    const rect = iframeEl.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY; // distance from document top

    // Scroll to very top of the iframe, not where the tap was
    window.scrollTo({
      top: absoluteTop - 10, // small offset
      behavior: 'smooth',
    });
  }

  // Manual button click: open tidycal in new tab (best mobile fallback) or scroll
  openInNewTabOrScroll() {
    // Mobile friendly: open the tidycal direct URL in a new tab — on iOS this often behaves much better
    if (this.isMobile()) {
      window.open(this.src, '_blank');
    } else {
      // Desktop: ensure iframe expanded then scroll
      this.expandAndScroll('manual');
    }
  }

  private isMobile(): boolean {
    // simple user agent based detection + window width fallback
    const ua = navigator.userAgent || '';
    const isIphoneIpod = /iPhone|iPod|iPad/i.test(ua);
    const smallWidth = window.innerWidth <= 768;
    return isIphoneIpod || smallWidth;
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.messageListener, false);
    if (this.pointerListenerUnsub) this.pointerListenerUnsub();
    if (this.clickListenerUnsub) this.clickListenerUnsub();
    if (this.resizeListenerUnsub) this.resizeListenerUnsub();
  }
}
