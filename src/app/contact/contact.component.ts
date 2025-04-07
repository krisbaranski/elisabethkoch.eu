import { Component } from '@angular/core';
import { AquaintmentComponent } from './aquaintment/aquaintment.component';
import { NewsletterComponent } from './../newsletter/newsletter.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [AquaintmentComponent, NewsletterComponent, TranslateModule],
})
export class ContactComponent {}
