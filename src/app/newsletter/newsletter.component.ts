import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Registriert die MailerLite-Erfolgsfunktion im globalen Fenster-Objekt
    (window as any).ml_webform_success_22029023 = () => {
      // Sucht die Formular-Elemente und blendet das Formular aus / Erfolg ein
      const formContainer = document.querySelector(
        '.ml-subscribe-form-22029023 .row-form',
      ) as HTMLElement;
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
