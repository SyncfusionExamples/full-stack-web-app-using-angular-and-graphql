import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import { TOGGLE_WATCHLIST } from '../GraphQL/mutation';
import { ToggleWatchlistType } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class ToggleWatchlistService extends Mutation<ToggleWatchlistType> {
  document = TOGGLE_WATCHLIST;
}
