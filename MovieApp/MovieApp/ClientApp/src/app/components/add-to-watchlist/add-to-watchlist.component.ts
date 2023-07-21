import { Component, Input, OnChanges } from '@angular/core';
import { EMPTY, ReplaySubject, switchMap, takeUntil } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { ToastUtility } from '@syncfusion/ej2-notifications';

@Component({
  selector: 'app-add-to-watchlist',
  templateUrl: './add-to-watchlist.component.html',
  styleUrls: ['./add-to-watchlist.component.css'],
})
export class AddToWatchlistComponent implements OnChanges {
  @Input({ required: true })
  movieId = 0;

  toggle = false;
  buttonText = '';
  iconClass = 'e-zoom-in-2';
  private destroyed$ = new ReplaySubject<void>(1);

  constructor(
    private readonly watchlistService: WatchlistService,
    private readonly subscriptionService: SubscriptionService
  ) {}

  ngOnChanges() {
    this.subscriptionService.watchlistItem$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((movieData: Movie[]) => {
        this.setFavourite(movieData);
        this.setButtonText();
      });
  }

  toggleValue() {
    this.toggle = !this.toggle;
    this.setButtonText();

    this.subscriptionService.userData$
      .pipe(
        switchMap((user) => {
          const userId = user.userId;
          if (userId > 0) {
            return this.watchlistService.toggleWatchlistItem(
              userId,
              this.movieId
            );
          } else {
            return EMPTY;
          }
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: () => {
          if (this.toggle) {
            ToastUtility.show({
              content: 'Movie added to your Watchlist.',
              position: { X: 'Right', Y: 'Top' },
              cssClass: 'e-toast-success',
            });
          } else {
            ToastUtility.show({
              content: 'Movie removed from your Watchlist.',
              position: { X: 'Right', Y: 'Top' },
            });
          }
        },
        error: (error) => {
          console.error('Error ocurred while setting the Watchlist : ', error);
        },
      });
  }

  private setFavourite(movieData: Movie[]) {
    const favouriteMovie = movieData.find((f) => f.movieId === this.movieId);

    if (favouriteMovie) {
      this.toggle = true;
    } else {
      this.toggle = false;
    }
  }

  private setButtonText() {
    if (this.toggle) {
      this.buttonText = 'Remove from Watchlist';
      this.iconClass = 'e-zoom-out-2';
    } else {
      this.buttonText = 'Add to Watchlist';
      this.iconClass = 'e-zoom-in-2';
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
