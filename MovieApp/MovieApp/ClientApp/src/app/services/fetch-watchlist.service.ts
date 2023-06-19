import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { GET_WATCHLIST } from '../GraphQL/query';
import { WatchlistType } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class FetchWatchlistService extends Query<WatchlistType> {
  document = GET_WATCHLIST;
}
