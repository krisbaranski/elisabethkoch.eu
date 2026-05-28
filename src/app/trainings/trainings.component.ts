import { Component, OnInit, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss',
})
export class TrainingsComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit() {
    this.titleService.setTitle(
      'Einzeltraining & Stimmcoaching in Berlin | Elisabeth Koch',
    );

    this.metaService.updateTag({
      name: 'description',
      content:
        'Individuelles Stimmtraining, Präsenzcoaching und Sprechtraining für Frauen. Finden Sie Ihre authentische Stimme für Beruf & Alltag.',
    });
  }
}
