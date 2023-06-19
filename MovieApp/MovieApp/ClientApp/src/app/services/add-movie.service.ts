import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import { ADD_MOVIE } from '../GraphQL/mutation';

@Injectable({
  providedIn: 'root',
})
export class AddMovieService extends Mutation {
  document = ADD_MOVIE;
}
