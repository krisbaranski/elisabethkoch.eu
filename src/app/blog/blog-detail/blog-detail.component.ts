import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit {
  // Mapping the URL slug directly to your local file names
  private slugToFileMap: { [key: string]: string } = {
    'souveraener-auftritt': 'auftritt.md',
    'stimmtraining-frauen': 'stimmtraining.md',
    lampenfieber: 'lampenfieber.md',
  };

  markdownPath: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // 1. Get the slug out of the URL (e.g., elisabethkoch.eu/blog/lampenfieber)
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug && this.slugToFileMap[slug]) {
      // 2. Point ngx-markdown to the exact file asset paths
      this.markdownPath = `assets/blog/${this.slugToFileMap[slug]}`;
    } else {
      this.markdownPath = `assets/blog/404.md`; // Fallback asset if article is missing
    }
  }
}
