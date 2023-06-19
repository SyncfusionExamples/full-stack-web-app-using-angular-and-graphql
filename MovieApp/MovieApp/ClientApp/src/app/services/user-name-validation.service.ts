import { Injectable } from '@angular/core';
import { ValidateUserNameService } from './validate-user-name.service';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  first,
  last,
  map,
  of,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserNameValidationService implements AsyncValidator {
  constructor(private readonly userService: UserService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.validateUserName(control.value).pipe(
      distinctUntilChanged(),
      map((result) => {
        if (result.data?.isUserNameAvailable && !result.loading) {
          return null;
        } else if (!result.loading) {
          return { userNameNotAvailable: true };
        } else {
          return null;
        }
      }),

      catchError(() => of(null))
    );
  }
}
