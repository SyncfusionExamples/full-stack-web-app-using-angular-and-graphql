import { Injectable } from '@angular/core';
import { MovieType } from '../models/movie';
import { GET_MOVIE_BY_ID } from '../GraphQL/query';
import { Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class FetchMovieByIdService extends Query<MovieType> {
  document = GET_MOVIE_BY_ID;
}
