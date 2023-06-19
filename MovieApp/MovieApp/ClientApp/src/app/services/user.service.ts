import { Injectable } from '@angular/core';
import { ValidateUserNameService } from './validate-user-name.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly validateUserNameService: ValidateUserNameService
  ) {}

  validateUserName(userName: string) {
    return this.validateUserNameService.watch(
      {
        userName: userName,
      },
      {
        fetchPolicy: 'no-cache',
      }
    ).valueChanges;
  }
}
