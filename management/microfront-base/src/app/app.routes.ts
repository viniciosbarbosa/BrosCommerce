import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../environments/environment.development';
import { InternalRoutes } from './shared/routes/internal.routes';
import { Error } from './shared/components/error/error';
import { ErrorCode } from './shared/enum/errors/error.enum';
import { ExternalRoutes } from './shared/routes/external.routes';
import { roleGuard } from './core/guards/role-guard';
import { RoleEnum } from './core/guards/enum/role.enum';

export const routes: Routes = [
  {
    path: ExternalRoutes.PRODUCT_CATEGORY,
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.productCategory,
        exposedModule: './routes',
      }).then((m) => m.routes),
    canActivate: [roleGuard([RoleEnum.MASTER, RoleEnum.ADMIN])],
  },
  {
    path: ExternalRoutes.REPORT,
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.report,
        exposedModule: './routes',
      }).then((m) => m.routes),
    canActivate: [roleGuard([RoleEnum.MASTER, RoleEnum.AUDIT])],
  },
  {
    path: ExternalRoutes.USERS,
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.users,
        exposedModule: './routes',
      }).then((m) => m.routes),
    canActivate: [roleGuard([RoleEnum.MASTER, RoleEnum.ADMIN])],
  },
  {
    path: InternalRoutes.PROFILE,
    loadComponent: () => import('./features/profile/profile').then((m) => m.Profile),
    canActivate: [roleGuard([RoleEnum.MASTER, RoleEnum.ADMIN, RoleEnum.AUDIT])],
  },
  {
    path: InternalRoutes.SETTINGS,
    loadComponent: () => import('./features/settings/settings').then((m) => m.Settings),
    canActivate: [roleGuard([RoleEnum.MASTER, RoleEnum.ADMIN, RoleEnum.AUDIT])],
  },
  {
    path: InternalRoutes.LOGIN,
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },
  {
    path: InternalRoutes.HOME,
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    canActivate: [roleGuard([RoleEnum.MASTER, RoleEnum.ADMIN, RoleEnum.AUDIT])],
  },
  {
    path: InternalRoutes.RESET_PASSWORD,
    loadChildren: () =>
      import('./features/reset-password/routes/reset-passoword.routes').then(
        (m) => m.resetPasswordRoutes,
      ),
  },
  {
    path: InternalRoutes.ERROR,
    loadComponent: () => import('./shared/components/error/error').then((m) => m.Error),
  },
  { path: '', redirectTo: InternalRoutes.HOME, pathMatch: 'full' },
  {
    path: InternalRoutes.ERROR,
    component: Error,
    data: { code: ErrorCode.NOT_FOUND },
  },
  {
    path: '**',
    component: Error,
    data: { code: ErrorCode.NOT_FOUND },
  },
];
