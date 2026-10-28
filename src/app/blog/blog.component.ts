import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface BlogPost {
  title: string;
  slug: string;
  date: string;
  fileName: string;
  previewText?: string; // Hier speichern wir die generierte Vorschau
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  // 1. Deine Artikelliste (Erweitere diese Liste einfach, wenn neue .md-Dateien dazukommen)
  allPosts: BlogPost[] = [
    {
      title: 'Lampenfieber erfolgreich bekämpfen',
      slug: 'lampenfieber',
      date: '2026-10-28',
      fileName: 'lampenfieber.md', // <-- Muss exakt dem Dateinamen entsprechen!
    },
    {
      title: 'Stimmtraining für Frauen',
      slug: 'stimmtraining-frauen',
      date: '2026-10-01',
      fileName: 'stimmtraining.md',
    },
    {
      title: 'Rhetorik im Alltag nutzen',
      slug: 'rhetorik-alltag',
      date: '2026-09-20',
      fileName: 'rhetorik.md',
    },
    {
      title: 'Körpersprache richtig deuten',
      slug: 'koerpersprache',
      date: '2026-09-05',
      fileName: 'koerpersprache.md',
    },
    {
      title: 'Lampenfieber erfolgreich bekämpfen',
      slug: 'lampenfieber',
      date: '2026-08-12',
      fileName: 'lampenfieber.md',
    },
  ];

  displayedPosts: BlogPost[] = []; // Artikel, die aktuell auf der Seite sichtbar sind
  currentPage: number = 1; // Die aktuelle Seite
  postsPerPage: number = 4; // Wie viele Artikel sollen pro Seite sichtbar sein?
  totalPages: number = 1; // Gesamtanzahl der Seiten

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.allPosts.length / this.postsPerPage);
    this.loadPreviews();
  }

  // 2. Automatisches Laden und Generieren der Vorschau-Texte
  loadPreviews(): void {
    this.allPosts.forEach((post) => {
      this.http
        .get(`assets/blog/${post.fileName}`, { responseType: 'text' })
        .subscribe({
          next: (markdownContent) => {
            // Erstellt eine Vorschau: Entfernt Markdown-Sonderzeichen und schneidet nach 200 Zeichen ab
            const cleanText = markdownContent.replace(/[#*`_\[\]\-]/g, '');
            post.previewText = cleanText.substring(0, 200) + '...';
            this.updatePageResults(); // Aktualisiert die Ansicht, sobald die Vorschau da ist
          },
          error: () => {
            post.previewText = 'Vorschautext konnte nicht geladen werden.';
            this.updatePageResults();
          },
        });
    });
  }

  // 3. Berechnet, welche Artikel auf der aktuellen Seite gezeigt werden
  updatePageResults(): void {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    this.displayedPosts = this.allPosts.slice(startIndex, endIndex);
  }

  // 4. Funktionen zum Umblättern der Seiten
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePageResults();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePageResults();
    }
  }
}
