import { Component, AfterViewInit, Renderer2 } from '@angular/core';

declare var ml_webform_success_22029023: any; // Reference global function

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent implements AfterViewInit {
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.loadMailerLiteScript();
  }

  loadMailerLiteScript() {
    const script = this.renderer.createElement('script');
    script.src = 'https://assets.mailerlite.com/js/universal.js';
    script.async = true;
    script.onload = () => {
      console.log('MailerLite script loaded.');
    };
    this.renderer.appendChild(document.body, script);
  }

  onNewsletterSubmit() {
    if (typeof ml_webform_success_22029023 === 'function') {
      ml_webform_success_22029023(); // Calls MailerLite function
    } else {
      console.warn('MailerLite function is not available.');
    }
  }
}

//   // name = '';
//   // email = '';

//   // onSubmit() {
//   //   if (!this.name || !this.email) {
//   //     alert('Please fill out all required fields.');
//   //     return;
//   //   }
//   //   alert('Form submitted successfully!');
//   // }

//   // constructor(private renderer: Renderer2) {}
//   // ngOnInit() {
//   //   const script = this.renderer.createElement('script');
//   //   script.src = 'https://assets.mailerlite.com/js/universal.js';
//   //   script.async = true;
//   //   this.renderer.appendChild(document.body, script);

//   //   // Initialize the MailerLite account
//   //   script.onload = () => {
//   //     (window as any).ml('account', '1264344');
//   //   };
//   // }

// }
