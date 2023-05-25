import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { GenreType } from '../models/genre';
import { GET_GENRE } from '../GraphQL/query';

@Injectable({
  providedIn: 'root',
})
export class FetchGenreService extends Query<GenreType> {
  document = GET_GENRE;
}
