import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { SimilarMovieType } from '../models/movie';
import { GET_SIMILAR_MOVIE } from '../GraphQL/query';

@Injectable({
  providedIn: 'root',
})
export class FetchSimilarMoviesService extends Query<SimilarMovieType> {
  document = GET_SIMILAR_MOVIE;
}
