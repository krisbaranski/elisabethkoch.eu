import { Component } from '@angular/core';
import { AquaintmentComponent } from './aquaintment/aquaintment.component';
import { NewsletterComponent } from '../newsletter/newsletter.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [AquaintmentComponent, NewsletterComponent],

  standalone: true,
})
export class ContactComponent {}
