import { Component, OnInit, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit() {
    // 🌟 Optimal für die Google-Suche (Max. 60 Zeichen)
    this.titleService.setTitle(
      'Stimmtraining & Auftrittscoaching für Frauen | Elisabeth Koch',
    );

    // 🌟 Die Vorschau-Beschreibung in den Suchergebnissen (Max. 155 Zeichen)
    this.metaService.updateTag({
      name: 'description',
      content:
        'Professionelles Stimmcoaching & Auftrittstraining für Frauen in Berlin. Lernen Sie, mit Ihrer Stimme zu überzeugen. Jetzt Termin vereinbaren!',
    });
  }
}
