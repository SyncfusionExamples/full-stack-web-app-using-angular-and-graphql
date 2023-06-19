import { Injectable } from '@angular/core';
import { SubscriptionService } from './subscription.service';
import { FetchWatchlistService } from './fetch-watchlist.service';
import { ToggleWatchlistService } from './toggle-watchlist.service';
import { map } from 'rxjs';
import { Movie } from '../models/movie';
import { ClearWatchlistService } from './clear-watchlist.service';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly fetchWatchlistService: FetchWatchlistService,
    private readonly toggleWatchlistService: ToggleWatchlistService,
    private readonly clearWatchlistService: ClearWatchlistService
  ) {}

  getWatchlistItems(userId: Number) {
    return this.fetchWatchlistService
      .watch(
        {
          userId: Number(userId),
        },
        {
          fetchPolicy: 'network-only',
        }
      )
      .valueChanges.pipe(
        map((result) => {
          if (result.data) {
            this.setWatchlist(result.data?.watchlist);
          }
        })
      );
  }

  toggleWatchlistItem(userId: number, movieId: number) {
    return this.toggleWatchlistService
      .mutate(
        {
          userId: Number(userId),
          movieId: Number(movieId),
        },
        {
          fetchPolicy: 'network-only',
        }
      )
      .pipe(
        map((result) => {
          if (result.data) {
            this.setWatchlist(result.data?.toggleWatchlist);
          }
        })
      );
  }

  clearWatchlist(userId: number) {
    return this.clearWatchlistService
      .mutate(
        {
          userId: Number(userId),
        },
        {
          fetchPolicy: 'network-only',
        }
      )
      .pipe(
        map((result) => {
          if (result.data) {
            this.setWatchlist([]);
          }
        })
      );
  }

  private setWatchlist(watchList: Movie[]) {
    this.subscriptionService.watchlistItemcount$.next(watchList.length);
    this.subscriptionService.watchlistItem$.next(watchList);
  }
}
