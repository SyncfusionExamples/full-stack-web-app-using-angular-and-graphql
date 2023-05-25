import { CanActivateFn } from '@angular/router';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  return true;
};
