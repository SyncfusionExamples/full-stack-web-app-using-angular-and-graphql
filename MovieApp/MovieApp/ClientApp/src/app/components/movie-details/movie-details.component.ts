import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EMPTY, map, switchMap } from 'rxjs';
import { FetchMovieByIdService } from 'src/app/services/fetch-movie-by-id.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent {
  userData$ = this.subscriptionService.userData$;

  readonly movieDetails$ = this.activatedRoute.paramMap.pipe(
    switchMap((params: Params) => {
      const selectedMovieId = Number(params.get('movieId'));
      if (selectedMovieId > 0) {
        return this.fetchMovieByIdService
          .watch(
            {
              filterInput: Number(selectedMovieId),
            },
            {
              fetchPolicy: 'network-only',
            }
          )
          .valueChanges.pipe(map((result) => result?.data?.movieList[0]));
      } else {
        return EMPTY;
      }
    })
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fetchMovieByIdService: FetchMovieByIdService,
    private readonly subscriptionService: SubscriptionService
  ) {}
}
