import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss',
    standalone: false
})
export class BlogComponent {
  constructor(private router: Router) {}
}
