import { CanActivateFn } from '@angular/router';

export const masterGuard: CanActivateFn = (route, state) => {
  return true;
};
