import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionService } from '../services/subscription.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const subscriptionService = inject(SubscriptionService);
  const router = inject(Router);

  if (localStorage.getItem('authToken')) {
    return true;
  }

  return subscriptionService.userData$.pipe(
    map((user) => {
      if (user.isLoggedIn) {
        return true;
      }
      router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    })
  );
};
