import { CanActivateFn } from '@angular/router';

export const auditGuard: CanActivateFn = (route, state) => {
  return true;
};
