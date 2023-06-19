import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { SubscriptionService } from './subscription.service';
import { User } from '../models/user';
import { LoginService } from './login.service';
import { UserLogin } from '../models/userLogin';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private readonly apollo: Apollo,
    private readonly subscriptionService: SubscriptionService,
    private readonly loginService: LoginService
  ) {}

  login(userLoginData: UserLogin) {
    return this.loginService.mutate({ loginData: userLoginData }).pipe(
      map((response) => {
        if (response.data) {
          localStorage.setItem('authToken', response.data.userLogin.token);
          this.setUserDetails();
        }
        return response;
      })
    );
  }

  setUserDetails() {
    const authToken = localStorage.getItem('authToken');

    if (authToken != null) {
      const userDetails = new User();
      const decodeUserDetails = JSON.parse(
        window.atob(authToken.split('.')[1])
      );

      userDetails.userId = decodeUserDetails.userId;
      userDetails.username = decodeUserDetails.name;
      userDetails.userTypeName = decodeUserDetails.sub;
      userDetails.isLoggedIn = true;
      this.subscriptionService.userData$.next(userDetails);
    }
  }

  logout() {
    localStorage.clear();
    this.resetSubscription();
    this.apollo.client.resetStore();
  }

  private resetSubscription() {
    this.subscriptionService.userData$.next(new User());
    this.subscriptionService.watchlistItemcount$.next(0);
  }
}
