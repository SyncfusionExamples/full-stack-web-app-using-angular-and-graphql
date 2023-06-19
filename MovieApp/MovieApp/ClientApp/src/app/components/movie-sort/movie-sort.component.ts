import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-sort',
  templateUrl: './movie-sort.component.html',
  styleUrls: ['./movie-sort.component.css'],
})
export class MovieSortComponent {
  @Input()
  selectedSort = '';

  public sortOptions: Object[] = [
    { Id: 'title', genre: 'Title' },
    { Id: 'rating', genre: 'Rating' },
    { Id: 'duration', genre: 'Duration' },
  ];

  public fields: Object = { text: 'genre', value: 'Id' };

  constructor(private readonly router: Router) {}

  sortMovieData(event: any) {
    this.router.navigate(['/filter'], {
      queryParams: { sortBy: event.value.toLocaleLowerCase() },
      queryParamsHandling: 'merge',
    });
  }
}
