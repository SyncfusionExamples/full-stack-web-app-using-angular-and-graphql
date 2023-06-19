import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { GET_USERNAME_AVAILABILITY } from '../GraphQL/query';
import { UserNameAvailableType } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ValidateUserNameService extends Query<UserNameAvailableType> {
  document = GET_USERNAME_AVAILABILITY;
}
