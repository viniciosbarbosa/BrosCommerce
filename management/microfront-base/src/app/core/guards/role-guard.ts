import { CanActivateFn } from '@angular/router';
import { RoleService } from './service/role.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { RoleEnum } from './enum/role.enum';
import { InternalRoutes } from '../../shared/routes/internal.routes';

import { ErrorCode } from '../../shared/enum/errors/error.enum';

export const roleGuard = (allowedRoles: RoleEnum[]): CanActivateFn => {
  return () => {
    const roleService = inject(RoleService);
    const router = inject(Router);

    const role = roleService.getRole();

    if (allowedRoles.includes(role)) {
      return true;
    }

    return router.createUrlTree([InternalRoutes.ERROR], {
      queryParams: { code: ErrorCode.FORBIDDEN },
    });
  };
};
