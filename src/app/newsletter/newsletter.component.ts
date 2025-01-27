import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss',
})
export class NewsletterComponent {
  name = '';
  email = '';

  onSubmit() {
    if (!this.name || !this.email) {
      alert('Please fill out all required fields.');
      return;
    }
    alert('Form submitted successfully!');
  }

  constructor(private renderer: Renderer2) {}
  ngOnInit() {
    const script = this.renderer.createElement('script');
    script.src = 'https://assets.mailerlite.com/js/universal.js';
    script.async = true;
    this.renderer.appendChild(document.body, script);

    // Initialize the MailerLite account
    script.onload = () => {
      (window as any).ml('account', '1264344');
    };
  }
}
