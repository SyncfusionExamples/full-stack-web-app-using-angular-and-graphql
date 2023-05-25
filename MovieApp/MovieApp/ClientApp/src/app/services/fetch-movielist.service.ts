import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { MovieType } from '../models/movie';
import { GET_MOVIES } from '../GraphQL/query';

@Injectable({
  providedIn: 'root',
})
export class FetchMovielistService extends Query<MovieType> {
  document = GET_MOVIES;
}
