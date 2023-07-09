import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionService } from '../services/subscription.service';
import { map } from 'rxjs';
import { UserType } from '../models/userType';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const subscriptionService = inject(SubscriptionService);
  const router = inject(Router);

  return subscriptionService.userData$.pipe(
    map((user) => {
      if (user.isLoggedIn && user.userTypeName === UserType.Admin) {
        return true;
      }
      router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    })
  );
};
