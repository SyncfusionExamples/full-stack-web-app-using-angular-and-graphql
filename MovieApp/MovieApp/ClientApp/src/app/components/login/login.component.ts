import { Component, OnDestroy } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, switchMap, takeUntil } from 'rxjs';
import { LoginForm } from 'src/app/models/loginForm';
import { UserLogin } from 'src/app/models/userLogin';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  protected loginForm!: FormGroup<LoginForm>;
  private destroyed$ = new ReplaySubject<void>(1);

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      username: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control('', Validators.required),
    });
  }

  protected get loginFormControl() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.valid) {
      this.authenticationService
        .login(this.loginForm.value as UserLogin)
        .pipe(
          switchMap(() => {
            return this.activatedRoute.queryParams;
          }),
          takeUntil(this.destroyed$)
        )
        .subscribe({
          next: (params) => {
            const returnUrl = params['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
          },
          error: (error) => {
            this.loginForm.reset();
            this.loginForm.setErrors({
              invalidLogin: true,
            });
            console.error('Error ocurred while login : ', error);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
