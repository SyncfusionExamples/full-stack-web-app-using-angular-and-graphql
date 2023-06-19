import { Injectable } from '@angular/core';
import { LOGIN } from '../GraphQL/mutation';
import { Mutation } from 'apollo-angular';
import { LoginType } from '../models/userLogin';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends Mutation<LoginType> {
  document = LOGIN;
}
