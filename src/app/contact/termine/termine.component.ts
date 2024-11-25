import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-termine',
  templateUrl: './termine.component.html',
  styleUrl: './termine.component.scss',
})
export class TermineComponent implements OnInit {
  @Input() darkMode = true;

  constructor() {}

  ngOnInit(): void {}
}
