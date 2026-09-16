import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // MailerLite-Erfolgsfunktion im globalen Fenster-Objekt registrieren
    (window as any).ml_webform_success_22029023 = () => {
      // Formular suchen und ausblenden
      const formContainer = document.querySelector(
        '.ml-subscribe-form-22029023 .row-form',
      ) as HTMLElement;
      // Erfolgstext suchen und einblenden
      const successContainer = document.querySelector(
        '.ml-subscribe-form-22029023 .row-success',
      ) as HTMLElement;

      if (formContainer && successContainer) {
        formContainer.style.display = 'none';
        successContainer.style.display = 'block';
      }
    };
  }
}
