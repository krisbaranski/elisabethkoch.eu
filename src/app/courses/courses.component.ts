import { Component, OnInit, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit() {
    this.titleService.setTitle(
      'Kurse & Workshops für Stimme & Wirkung | Elisabeth Koch',
    );

    this.metaService.updateTag({
      name: 'description',
      content:
        'Entdecken Sie unsere Kompaktkurse & Rhetorik-Workshops für Frauen. Wirkungsvoll sprechen, souverän auftreten und Barrieren abbauen.',
    });
  }
}
