import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import { DELETE_MOVIE } from '../GraphQL/mutation';

@Injectable({
  providedIn: 'root',
})
export class DeleteMovieService extends Mutation {
  document = DELETE_MOVIE;
}
