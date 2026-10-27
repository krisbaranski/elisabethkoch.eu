import { Component, OnInit, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrl: './analyse.component.scss',
})
export class AnalyseComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit() {
    // 🚀 Google-Titel für die Kontaktseite
    this.titleService.setTitle(
      'Professionelle Stimmanalyse | Elisabeth Koch Berlin',
    );

    // 🚀 Google-Beschreibung
    this.metaService.updateTag({
      name: 'description',
      content:
        'Entdecken Sie das volle Potenzial Ihrer Stimme. Mit einer professionellen Stimmanalyse decken wir Stärken und Blockaden auf. Jetzt online Termin vereinbaren!',
    });
  }
}
