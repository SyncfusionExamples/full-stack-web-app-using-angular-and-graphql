import { Component } from '@angular/core';
import { EMPTY, ReplaySubject, switchMap, takeUntil } from 'rxjs';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { ToastUtility } from '@syncfusion/ej2-notifications';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent {
  private destroyed$ = new ReplaySubject<void>(1);
  watchlistItems$ = this.subscriptionService.watchlistItem$;

  constructor(
    private readonly watchlistService: WatchlistService,
    private readonly subscriptionService: SubscriptionService
  ) {}

  clearWatchlist() {
    this.subscriptionService.userData$
      .pipe(
        switchMap((user) => {
          const userId = user.userId;
          if (userId > 0) {
            return this.watchlistService.clearWatchlist(userId);
          } else {
            return EMPTY;
          }
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: () => {
          ToastUtility.show({
            content: 'Watchlist cleared!!!',
            position: { X: 'Right', Y: 'Top' },
          });
        },
        error: (error) => {
          console.error('Error ocurred while deleting the Watchlist : ', error);
        },
      });
  }
}
