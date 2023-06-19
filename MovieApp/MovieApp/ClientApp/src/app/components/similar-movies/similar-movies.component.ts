import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EMPTY, map, switchMap } from 'rxjs';
import { FetchSimilarMoviesService } from 'src/app/services/fetch-similar-movies.service';

@Component({
  selector: 'app-similar-movies',
  templateUrl: './similar-movies.component.html',
  styleUrls: ['./similar-movies.component.css'],
})
export class SimilarMoviesComponent {
  readonly similarMovies$ = this.activatedRoute.paramMap.pipe(
    switchMap((params: Params) => {
      const selectedMovieId = Number(params.get('movieId'));
      if (selectedMovieId > 0) {
        return this.fetchSimilarMoviesService
          .watch(
            {
              movieId: Number(selectedMovieId),
            },
            {
              fetchPolicy: 'network-only',
            }
          )
          .valueChanges.pipe(map((result) => result?.data?.similarMovies));
      } else {
        return EMPTY;
      }
    })
  );
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fetchSimilarMoviesService: FetchSimilarMoviesService
  ) {}
}
