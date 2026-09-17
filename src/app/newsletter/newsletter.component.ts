import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Falls das MailerLite Skript doch irgendwo greift, fangen wir es hier ab
    (window as any).ml_webform_success_22029023 = () => {
      this.showSuccessText();
    };
  }

  // Wird direkt beim Klick auf den Absenden-Button ausgeführt
  onFormSubmit(): void {
    this.showSuccessText();
  }

  private showSuccessText(): void {
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
  }
}
