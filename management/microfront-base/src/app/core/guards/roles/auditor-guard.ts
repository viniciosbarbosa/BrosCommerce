import { CanActivateFn } from '@angular/router';

export const auditorGuard: CanActivateFn = (route, state) => {
  return true;
};
