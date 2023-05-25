import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Genre } from 'src/app/models/genre';
import { FetchGenreService } from 'src/app/services/fetch-genre.service';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css'],
})
export class MovieFilterComponent {
  readonly defaultGenre = 'All Genres';
  allGenre: Genre = { genreId: 0, genreName: this.defaultGenre };

  genreList$ = this.fetchGenreService.watch().valueChanges.pipe(
    map((result) => {
      if (result.data) {
        return result.data.genreList.concat(this.allGenre).reverse();
      } else {
        return [];
      }
    })
  );

  public setfield = {
    text: 'genreName',
    value: 'genreId',
    tooltip: 'genreName',
  };

  constructor(
    private readonly fetchGenreService: FetchGenreService,
    private readonly router: Router
  ) {}

  filterMovie(event: any) {
    const selectedGenre = event.target.innerText.toLocaleLowerCase();

    if (selectedGenre === this.defaultGenre.toLocaleLowerCase()) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/filter'], {
        queryParams: { genre: selectedGenre },
        queryParamsHandling: 'merge',
      });
    }
  }
}
