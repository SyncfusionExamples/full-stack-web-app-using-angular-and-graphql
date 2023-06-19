import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Genre } from 'src/app/models/genre';
import { MovieHelperService } from 'src/app/services/movie-helper.service';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css'],
})
export class MovieFilterComponent {
  readonly defaultGenre = 'All Genres';
  allGenre: Genre = { genreId: 0, genreName: this.defaultGenre };

  genreList$ = this.movieHelperService.genreList$.pipe(
    map((result) => {
      if (result) {
        return result.genreList.concat(this.allGenre).reverse();
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
    private readonly movieHelperService: MovieHelperService,
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
