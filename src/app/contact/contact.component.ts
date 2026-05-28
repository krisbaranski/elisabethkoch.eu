import { Component, OnInit, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit() {
    // 🚀 Google-Titel für die Kontaktseite
    this.titleService.setTitle(
      'Kontakt & Termin vereinbaren | Elisabeth Koch Berlin',
    );

    // 🚀 Google-Beschreibung
    this.metaService.updateTag({
      name: 'description',
      content:
        'Haben Sie Fragen oder möchten Sie direkt ein Stimmtraining buchen? Kontaktieren Sie mich per E-Mail, Telefon oder buchen Sie direkt online einen Termin.',
    });
  }
}
