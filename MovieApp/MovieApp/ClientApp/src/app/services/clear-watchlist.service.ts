import { Injectable } from '@angular/core';
import { CLEAR_WATCHLIST } from '../GraphQL/mutation';
import { Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class ClearWatchlistService extends Mutation {
  document = CLEAR_WATCHLIST;
}
