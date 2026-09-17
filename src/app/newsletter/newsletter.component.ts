import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {
    // Kleiner Timeout, damit Angular das HTML zu 100% fertig im Browser gerendert hat
    setTimeout(() => {
      // Prüft, ob das Universal-Skript aus der index.html bereitsteht
      if ((window as any).ml) {
        // Zwingt MailerLite, die Seite nach dem Platzhalter "3oWMzk" abzusuchen
        // und das Formular live reinzuladen!
        (window as any).ml('account', '1264344');
      }
    }, 100);
  }
}
