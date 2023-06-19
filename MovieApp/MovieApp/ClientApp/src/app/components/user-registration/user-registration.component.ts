import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { UserRegistration } from 'src/app/models/userRegistration';
import { UserRegistrationForm } from 'src/app/models/userRegistrationForm';
import { CustomFormValidatorService } from 'src/app/services/custom-form-validator.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent {
  protected userRegistrationForm!: FormGroup<UserRegistrationForm>;
  private destroyed$ = new ReplaySubject<void>(1);
  protected submitted = false;
  public data = ['Male', 'Female'];

  constructor(
    private readonly router: Router,
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly customFormValidator: CustomFormValidatorService,
    private readonly registrationService: RegistrationService
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userRegistrationForm = this.formBuilder.group(
      {
        firstName: this.formBuilder.control('', Validators.required),
        lastName: this.formBuilder.control('', Validators.required),
        userName: this.formBuilder.control('', Validators.required),
        password: this.formBuilder.control('', [
          Validators.required,
          this.customFormValidator.passwordPatternValidator(),
        ]),
        confirmPassword: this.formBuilder.control('', Validators.required),
        gender: this.formBuilder.control('', Validators.required),
      },
      {
        validators: [
          this.customFormValidator.matchPasswordValidator(
            'password',
            'confirmPassword'
          ),
        ],
      }
    );
  }

  registerUser(): void {
    this.submitted = true;

    const userRegistrationData: UserRegistration = {
      firstName: this.userRegistrationForm.value.firstName ?? '',
      lastName: this.userRegistrationForm.value.lastName ?? '',
      username: this.userRegistrationForm.value.userName ?? '',
      password: this.userRegistrationForm.value.password ?? '',
      confirmPassword: this.userRegistrationForm.value.confirmPassword ?? '',
      gender: this.userRegistrationForm.value.gender ?? '',
    };

    if (this.userRegistrationForm.valid) {
      this.registrationService
        .mutate({
          registrationData: userRegistrationData,
        })
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: () => {
            this.router.navigate(['/login']);
          },
          error: (error) => {
            // implemnt snacbar here
            console.error(
              'error occurred while trying to register a new user : ',
              error
            );
          },
        });
    }
  }

  get registrationFormControl() {
    return this.userRegistrationForm.controls;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
