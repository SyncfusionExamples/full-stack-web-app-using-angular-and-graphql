import { Injectable } from '@angular/core';
import { UPDATE_MOVIE } from '../GraphQL/mutation';
import { Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class UpdateMovieService extends Mutation {
  document = UPDATE_MOVIE;
}
