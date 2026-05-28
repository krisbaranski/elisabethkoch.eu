import { Component, OnInit, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser'; // 🌟 Die Angular SEO-Werkzeuge

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit() {
    // 🚀 Der blaue Titel für die Google-Vorschau
    this.titleService.setTitle(
      'Über Elisabeth Koch | Stimmcoach & Trainerin in Berlin',
    );

    // 🚀 Der graue Werbetext darunter
    this.metaService.updateTag({
      name: 'description',
      content:
        'Erfahren Sie mehr über meinen Werdegang, meine Philosophie und meine Arbeit als Trainerin für Stimme, Präsenz und Wirkung bei Frauen.',
    });
  }
}
