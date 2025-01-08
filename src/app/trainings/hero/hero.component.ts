import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  @Input() titleMedium = '';
  @Input() titleBig = '';
  @Input() text = '';

  constructor() {}

  ngOnInit(): void {}
}
