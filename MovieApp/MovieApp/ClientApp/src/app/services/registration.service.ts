import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import { REGISTER_USER } from '../GraphQL/mutation';
import { RegistrationType } from '../models/userRegistration';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService extends Mutation<RegistrationType> {
  document = REGISTER_USER;
}
